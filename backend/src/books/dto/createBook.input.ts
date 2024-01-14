import { IsNotEmpty } from 'class-validator'
import { InputType, PartialType, Field, ObjectType } from '@nestjs/graphql'
import { Book } from '../models/book.model'

@InputType()
export class CreateBookInput {
  @Field()
  @IsNotEmpty()
  supplierCode: string

  @Field()
  @IsNotEmpty()
  bookNumber: string

  @Field()
  @IsNotEmpty()
  name: string

  @Field()
  publish: string

  @Field()
  discount: string

  @Field()
  stock: string

  @Field()
  price: string

  @Field()
  author: string

  @Field()
  printTime: string

  @Field()
  readership: string

  @Field()
  classification: string

  @Field()
  address: string

  @Field()
  format: string
}

@InputType()
export class SearchBookInput extends PartialType(CreateBookInput) {
  @Field()
  pageSize: number

  @Field()
  current: number
}

@ObjectType()
export class SearchBookResult {
  @Field()
  data: Book[]
  @Field()
  page: number
  @Field()
  total: number
}

@ObjectType()
class DashBoardBefore {
  @Field()
  num: number

  @Field()
  before: number
}

@ObjectType()
export class DashBoardData {
  @Field()
  data: Book[]

  @Field()
  quantity: DashBoardBefore

  @Field()
  bookType: DashBoardBefore
}
