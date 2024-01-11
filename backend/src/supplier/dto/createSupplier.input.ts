import { IsNotEmpty } from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateSupplierInput {
  @Field()
  @IsNotEmpty()
  name: string

  @Field()
  @IsNotEmpty()
  code: string
}

@InputType()
export class UpdateSupplierInput {
  @Field()
  @IsNotEmpty()
  name: string

  @Field()
  @IsNotEmpty()
  code: string
}
