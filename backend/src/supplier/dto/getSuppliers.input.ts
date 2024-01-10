import { IsNotEmpty } from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class GetSupplierInput {
  @Field()
  @IsNotEmpty()
  name: string

  @Field()
  @IsNotEmpty()
  code: string
}
