import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TravelService } from './travel.service';
import { CreateTravelInput } from './dto/create-travel.input';
import { UpdateTravelInput } from './dto/update-travel.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { Post } from '../posts/models/post.model';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '@prisma/client';
import { Travel } from './models/travel.model';

@Resolver(() => Travel)
export class TravelResolver {
  constructor(private readonly travelService: TravelService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Travel)
  createTravel(
    @UserEntity() user: User,
    @Args('createTravelInput') createTravelInput: CreateTravelInput
  ) {
    console.log(user.id);
    return this.travelService.create(user.id, createTravelInput);
  }

  @Query(() => [Travel])
  userTravel() {
    return this.travelService.findAll();
  }

  @Query(() => Travel)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.travelService.findOne(id);
  }

  @Mutation(() => Travel)
  updateTravel(
    @Args('updateTravelInput') updateTravelInput: UpdateTravelInput
  ) {
    return this.travelService.update(updateTravelInput.id, updateTravelInput);
  }

  @Mutation(() => Travel)
  removeTravel(@Args('id', { type: () => Int }) id: number) {
    return this.travelService.remove(id);
  }
}
