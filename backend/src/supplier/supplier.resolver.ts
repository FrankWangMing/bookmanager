import { Args, Resolver, Mutation,Subscription } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { Supplier } from './model/supplier.model';
import { PubSub } from 'graphql-subscriptions';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateSupplierInput } from './dto/createSupplier.input';

const pubSub = new PubSub();

@Resolver()
export class SupplierResolver {

    constructor(private prisma: PrismaService) {}

    @Subscription(() => Supplier)
    supplierCreated() {
      return pubSub.asyncIterator('supplierCreated');
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Supplier)
    async createSupplier(
      @Args('data') data: CreateSupplierInput
    ) {
      const newSupplier = this.prisma.supplier.create({
        data: {
          supplierCode: data.supplierCode,
          name:data.name,
        },
      });
      await pubSub.publish('supplierCreated', { supplierCreated: newSupplier });
      return newSupplier;
    }
}
