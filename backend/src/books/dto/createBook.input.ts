import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {

  @Field()
  @IsNotEmpty()
  supplierCode: string;

  @Field()
  @IsNotEmpty()
  bookNumber: number;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  publish: string;
  
  @Field()
  discount: number;

  @Field()
  stock: number;

  @Field()
  price: number;
  
  @Field()
  author: string;
  
  @Field()
  printTime: string;
  
  @Field()
  readership: string;
  
  @Field()
  classification: string;
  
  @Field()
  address: string;
  
  @Field()
  format: string;
}
