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
  createManyBookInput
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

  @UseGuards(GqlAuthGuard)
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Book])
  async createBookMany(@Args('data') data: createManyBookInput) {
    const newBooks = await this.prisma.book.createMany({
      data: data.data
    })

    // await pubSub.publish('bookCreated', { postCreated: newBook })
    return newBooks
  }

  @Query(() => [Book])
  async getBooks() {
    return (await this.prisma.book.findMany()).sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime()
    })
  }
  @Query(() => Book)
  async book(@Args() id: BookIdArgs) {
    return this.prisma.book.findUnique({ where: { bookNumber: id.bookId } })
  }

  @Query(() => [Book])
  async searchBooks(@Args('data') data: SearchBookInput) {
    console.log(data.bookNumber)
    if (data.bookNumber) {
      return [
        await this.prisma.book.findUnique({
          where: { bookNumber: data.bookNumber }
        })
      ]
    } else {
      return await this.prisma.book.findMany({
        where: {
          discount: data.discount,
          price: data.price,
          stock: data.stock,
          address: {
            contains: data.address
          },
          author: {
            contains: data.author
          },
          classification: {
            contains: data.classification
          },
          format: {
            contains: data.format
          },
          name: {
            contains: data.name
          },
          printTime: {
            contains: data.printTime
          },
          publish: {
            contains: data.publish
          },
          readership: {
            contains: data.readership
          },
          supplierCode: {
            contains: data.supplierCode
          }
        }
      })
    }
  }

  @ResolveField('supplier', () => Supplier)
  async supplier(@Parent() book: Book) {
    return this.prisma.supplier.findUnique({
      where: { code: book.supplierCode }
    })
  }
}
