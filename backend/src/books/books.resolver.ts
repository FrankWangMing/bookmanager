import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from "@nestjs/graphql";
import { Book } from "./models/book.model";
import { PrismaService } from "nestjs-prisma";
import { PubSub } from "graphql-subscriptions";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";
import { UserEntity } from "src/common/decorators/user.decorator";
import { Supplier } from "src/supplier/model/supplier.model";
import { CreateBookInput } from "./dto/createBook.input";
import { BookIdArgs } from "./dto/book-id.args";

const pubSub = new PubSub();
@Resolver(() => Book)
export class BooksResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => Book)
  bookCreated() {
    return pubSub.asyncIterator("bookCreated");
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Book)
  async createBook(@Args("data") data: CreateBookInput) {
    return this.prisma.book
      .findUnique({
        where: {
          bookNumber: data.bookNumber,
        },
      })
      .then((r) => {
        if (r == null) {
          return this.prisma.book
            .create({
              data,
            })
            .then((newBook) => {
              pubSub.publish("bookCreated", { postCreated: newBook });
              return newBook;
            });
        } else {
          return this.prisma.book.update({
            where: {
              bookNumber: data.bookNumber,
            },
            data,
          });
        }
      });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Book)
  async createBookMany(@Args("data") data: CreateBookInput) {
    const newBook = this.prisma.book.create({
      data: {
        supplierCode: data.supplierCode,
        bookNumber: data.bookNumber,
        name: data.name,
        publish: data.publish,
        discount: data.discount,
        stock: data.stock,
        price: data.price,
        author: data.author,
        printTime: data.printTime,
        readership: data.readership,
        classification: data.classification,
        address: data.address,
        format: data.format,
      },
    });
    await pubSub.publish("bookCreated", { postCreated: newBook });
    return newBook;
  }

  @Query(() => [Book])
  async getBooks() {
    return this.prisma.book.findMany();
  }
  @Query(() => Book)
  async book(@Args() id: BookIdArgs) {
    return this.prisma.book.findUnique({ where: { bookNumber: id.bookId } });
  }

  @ResolveField("supplier", () => Supplier)
  async supplier(@Parent() book: Book) {
    return this.prisma.supplier.findUnique({
      where: { code: book.supplierCode },
    });
  }
}
