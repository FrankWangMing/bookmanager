import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { BaseModel } from 'src/common/models/base.model';
import { Supplier } from 'src/supplier/model/supplier.model';

@ObjectType()
export class Book extends BaseModel {

   @Field(()=>Number)
   bookNumber: Number;

   @Field(() => String)
   name: string;

   @Field(() =>String)
   publish: String;

   @Field(() =>Number)
   discount: Number;

   @Field(() =>Number)
  stock: Number;

   @Field(() =>Number)
    price: Number;

    @Field(() =>String)
   author: String;

  @Field(() =>String)
  printTime: String;

  @Field(() =>String)
  readership: String;
 
  @Field(() =>String)
  classification: String;

  @Field(() =>String)
  address: String;
 

  @Field(() =>String)
  format: String;

//   @Field(() => Supplier,{ nullable: false })
//   supplier: Supplier;
}



