import { Module } from '@nestjs/common';
import { BooksResolver } from './books.resolver';


@Module({
  imports: [],
  providers: [BooksResolver],
})
export class BooksModule {}
