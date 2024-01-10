import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from 'src/common/models/base.model'
import { Supplier } from 'src/supplier/model/supplier.model'

@ObjectType()
export class Book extends BaseModel {
  @Field(() => Number)
  bookNumber: number

  @Field(() => String)
  name: string

  @Field(() => String)
  publish: string

  @Field(() => Number)
  discount: number

  @Field(() => Number)
  stock: number

  @Field(() => Number)
  price: number

  @Field(() => String)
  author: string

  @Field(() => String)
  printTime: string

  @Field(() => String)
  readership: string

  @Field(() => String)
  classification: string

  @Field(() => String)
  address: string

  @Field(() => String)
  format: string

  @Field(() => Supplier, { nullable: false })
  supplier: Supplier

  @Field(() => String)
  supplierCode: string
}
