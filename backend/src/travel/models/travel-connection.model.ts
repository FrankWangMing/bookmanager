import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { Travel } from './travel.model';

@ObjectType()
export class TravelConnection extends PaginatedResponse(Travel) {}
