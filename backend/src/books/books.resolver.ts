import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription
} from '@nestjs/graphql'
import { Book } from './models/book.model'
import { PrismaService } from 'nestjs-prisma'
import { PubSub } from 'graphql-subscriptions'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { Supplier } from 'src/supplier/model/supplier.model'
import {
  CreateBookInput,
  SearchBookInput,
  SearchBookResult
} from './dto/createBook.input'
import { BookIdArgs } from './dto/book-id.args'

const pubSub = new PubSub()
@Resolver(() => Book)
export class BooksResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => Book)
  bookCreated() {
    return pubSub.asyncIterator('bookCreated')
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Book)
  async createBook(@Args('data') data: CreateBookInput) {
    return this.prisma.book
      .findUnique({
        where: {
          bookNumber: data.bookNumber
        }
      })
      .then((r) => {
        console.log(r)
        if (r == null) {
          return this.prisma.book
            .create({
              data
            })
            .then((newBook) => {
              console.log(newBook)
              pubSub.publish('bookCreated', { postCreated: newBook })
              return newBook
            })
            .catch((e) => {
              console.log(e)
            })
        } else {
          return this.prisma.book.update({
            where: {
              bookNumber: data.bookNumber
            },
            data
          })
        }
      })
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Number)
  async CreateManyBook(
    @Args({ name: 'data', type: () => [CreateBookInput] })
    data: [CreateBookInput]
  ) {
    const newBooks = await this.prisma.book.createMany({
      data: data,
      skipDuplicates: true
    })
    console.log('dd', newBooks)

    // await pubSub.publish('bookCreated', { postCreated: newBook })
    return 1
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Book])
  async getBooks() {
    return (await this.prisma.book.findMany()).sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime()
    })
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => SearchBookResult)
  async getBooksBySearch(@Args('data') data: SearchBookInput) {
    const result = await (
      await this.prisma.book.findMany({
        where: {
          name: {
            contains: data.name
          },
          bookNumber: {
            contains: data.bookNumber
          },
          supplierCode: {
            contains: data.supplierCode
          },
          discount: {
            contains: data.discount
          },
          author: {
            contains: data.author
          },
          readership: {
            contains: data.readership
          }
        },
        take: data.pageSize,
        skip: (data.current - 1) * data.pageSize
      })
    ).sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime()
    })
    return {
      data: result,
      page: data.current,
      total: (await this.prisma.book.findMany()).length
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Book)
  async book(@Args() id: BookIdArgs) {
    return this.prisma.book.findUnique({ where: { bookNumber: id.bookId } })
  }

  @ResolveField('supplier', () => Supplier)
  async supplier(@Parent() book: Book) {
    return this.prisma.supplier.findUnique({
      where: { code: book.supplierCode }
    })
  }
}
