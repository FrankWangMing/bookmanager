import { Field, ObjectType } from "@nestjs/graphql";
import { Book } from "src/books/models/book.model";
import { BaseModel } from "src/common/models/base.model";


@ObjectType()
export class Supplier extends BaseModel {
    @Field()
    name: string;
  
    @Field(()=>String)
    supplierCode: string ;
 
    @Field(() => [Book], { nullable: true })
    books?: [Book] | null;
}