import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { Book } from 'src/books/models/book.model';

@InputType()
export class CreateSupplierInput {

    @Field()
    @IsNotEmpty()
    name: string;
  
    @Field()
    @IsNotEmpty()
    supplierCode: string ;
}
