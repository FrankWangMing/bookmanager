import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLJWT } from "graphql-scalars";
import { User } from "src/users/models/user.model";

@ObjectType()
export class Token {
  @Field(() => GraphQLJWT, { description: "JWT access token" })
  accessToken: string;

  @Field(() => GraphQLJWT, { description: "JWT refresh token" })
  refreshToken: string;
}
