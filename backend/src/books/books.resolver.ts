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
  DashBoardData,
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

  @Query(() => DashBoardData)
  async dashBoard() {
    const targetDate = new Date()
    targetDate.setHours(0, 0, 0, 0)
    const beforeDate = new Date()
    beforeDate.setHours(0, 0, 0, 0)
    beforeDate.setDate(targetDate.getDate() - 1)
    const data = await this.prisma.book.findMany({
      where: {
        updatedAt: {
          gte: targetDate
        }
      }
    })
    const beforeData = await this.prisma.book.findMany({
      where: {
        updatedAt: {
          lte: targetDate,
          gt: beforeDate
        }
      }
    })
    return {
      data,
      quantity: {
        num: data.reduce((pre, current) => {
          return (pre += Number(current.stock))
        }, 0),
        before:
          data.reduce((pre, current) => {
            return (pre += Number(current.stock))
          }, 0) -
          beforeData.reduce((pre, current) => {
            return (pre += Number(current.stock))
          }, 0)
      },
      bookType: {
        num: data.length,
        before: data.length - beforeData.length
      }
    }
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
    data.map(async (i) => {
      await this.prisma.book.upsert({
        where: {
          bookNumber: i.bookNumber
        },
        create: {
          supplierCode: String(i.supplierCode),
          bookNumber: String(i.bookNumber),
          name: String(i.name),
          publish: String(i.publish),
          discount: String(i.discount),
          stock: String(i.stock),
          price: String(i.price),
          author: String(i.author),
          printTime: String(i.printTime),
          readership: String(i.readership),
          classification: String(i.classification),
          address: String(i.address),
          format: String(i.format)
        },
        update: {
          supplierCode: String(i.supplierCode),
          name: String(i.name),
          publish: String(i.publish),
          discount: String(i.discount),
          stock: String(i.stock),
          price: String(i.price),
          author: String(i.author),
          printTime: String(i.printTime),
          readership: String(i.readership),
          classification: String(i.classification),
          address: String(i.address),
          format: String(i.format)
        }
      })
    })
    return 1
    // return this.prisma.book.
    // const res = await this.prisma.book.createMany({
    //   data: data
    //   // skipDuplicates: true
    // })
    // console.log(res)

    // await pubSub.publish('bookCreated', { postCreated: newBook })
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
    let result = []
    let count = 0
    if (data.bookNumbers.length == 0) {
      result = await (
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
            }
          },
          take: data.pageSize,
          skip: (data.current - 1) * data.pageSize
        })
      ).sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime()
      })
      count = await this.prisma.book.count({
        where: {
          name: {
            contains: data.name
          },
          bookNumber: {
            contains: data.bookNumber
          },
          supplierCode: {
            contains: data.supplierCode
          }
        }
      })
    } else {
      result = await (
        await this.prisma.book.findMany({
          where: {
            name: {
              contains: data.name
            },
            bookNumber: {
              in: data.bookNumbers
            },
            supplierCode: {
              contains: data.supplierCode
            }
          },
          take: data.pageSize,
          skip: (data.current - 1) * data.pageSize
        })
      ).sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime()
      })
      count = await this.prisma.book.count({
        where: {
          name: {
            contains: data.name
          },
          bookNumber: {
            in: data.bookNumbers
          },
          supplierCode: {
            contains: data.supplierCode
          }
        }
      })
    }

    return {
      data: result,
      page: data.current,
      total: count
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
