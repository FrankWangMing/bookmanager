import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { Book } from './models/book.model';
import { PrismaService } from 'nestjs-prisma';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { Supplier } from 'src/supplier/model/supplier.model';
import { CreateBookInput } from './dto/createBook.input';

const pubSub = new PubSub();
@Resolver(()=>Book)
export class BooksResolver {
    constructor(private prisma: PrismaService) {}

    @Subscription(() => Book)
    bookCreated() {
      return pubSub.asyncIterator('bookCreated');
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Book)
    async createBook(
      @Args('data') data: CreateBookInput
    ) {
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
          printTime:  data.printTime,
          readership:  data.readership,
          classification:  data.classification,
          address:  data.address,
          format:  data.format,
        },
      });
      await pubSub.publish('bookCreated', { postCreated: newBook });
      return newBook;
    }





}
