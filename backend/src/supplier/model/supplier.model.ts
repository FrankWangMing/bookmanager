import { Field, ObjectType } from "@nestjs/graphql";
import { IsEmpty } from "class-validator";
import { Book } from "src/books/models/book.model";
import { BaseModel } from "src/common/models/base.model";

@ObjectType()
export class Supplier extends BaseModel {
  @Field()
  @IsEmpty()
  name: string;

  @Field(() => String)
  @IsEmpty()
  code: string;

  @Field(() => [Book], { nullable: true })
  books?: [Book] | null;
}
