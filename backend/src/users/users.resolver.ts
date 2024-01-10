import { PrismaService } from "nestjs-prisma";
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { UserEntity } from "src/common/decorators/user.decorator";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";
import { UsersService } from "./users.service";
import { User } from "./models/user.model";
import { ChangePasswordInput } from "./dto/change-password.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { SignupInput } from "src/auth/dto/signup.input";
import { AuthService } from "src/auth/auth.service";

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private prisma: PrismaService
  ) {}

  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @UserEntity() user: User,
    @Args("data") newUserData: UpdateUserInput
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args("data") changePassword: ChangePasswordInput
  ) {
    return this.usersService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }

  @Mutation(() => User)
  async createUser(@Args("data") data: SignupInput) {
    return this.usersService.createUser(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async deleteUserById(@Args("email") email: string) {
    const deletedUser = await this.prisma.user.delete({
      where: { email },
    });
    console.log(deletedUser);
    return deletedUser;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [User])
  findUser(@Args("data") data: SignupInput) {
    return this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
  }

  @Query(() => [User])
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @ResolveField("posts")
  posts(@Parent() author: User) {
    return this.prisma.user.findUnique({ where: { id: author.id } }).posts();
  }
}
