import {
  Args,
  Resolver,
  Query,
  Mutation,
  Subscription,
  Parent,
  ResolveField
} from '@nestjs/graphql'
import { PrismaService } from 'nestjs-prisma'
import { Supplier } from './model/supplier.model'
import { PubSub } from 'graphql-subscriptions'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { UseGuards } from '@nestjs/common'
import { CreateSupplierInput } from './dto/createSupplier.input'

const pubSub = new PubSub()

@Resolver(() => Supplier)
export class SupplierResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => Supplier)
  supplierCreated() {
    return pubSub.asyncIterator('supplierCreated')
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Supplier)
  async createSupplier(@Args('data') data: CreateSupplierInput) {
    const newSupplier = this.prisma.supplier.create({
      data: {
        code: data.code,
        name: data.name
      }
    })
    await pubSub.publish('supplierCreated', { supplierCreated: newSupplier })
    return newSupplier
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Supplier)
  async updateSupplier(@Args('data') data: CreateSupplierInput) {
    console.log(data)
    const newSupplier = this.prisma.supplier.update({
      data: {
        code: data.code,
        name: data.name
      },
      where: {
        code: data.code
      }
    })
    return newSupplier
  }

  @Query(() => [Supplier])
  async getSupplier() {
    return this.prisma.supplier.findMany()
  }

  @ResolveField('books')
  books(@Parent() supplier: Supplier) {
    return this.prisma.supplier
      .findUnique({
        where: { code: supplier.code }
      })
      .books()
  }
}
