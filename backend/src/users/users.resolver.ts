import { PrismaService } from 'nestjs-prisma'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { UserEntity } from 'src/common/decorators/user.decorator'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { UsersService } from './users.service'
import { User } from './models/user.model'
import { ChangePasswordInput } from './dto/change-password.input'

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.usersService.changePassword(
      user.id,
      user.password,
      changePassword
    )
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async deleteUserById(@Args('email') email: string) {
    const deletedUser = await this.prisma.user.delete({
      where: { email }
    })
    return deletedUser
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  getAllUsers() {
    return this.usersService.getAllUsers()
  }
}
