import { Injectable } from '@nestjs/common';
import { CreateTravelInput } from './dto/create-travel.input';
import { UpdateTravelInput } from './dto/update-travel.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TravelService {
  constructor(private prisma: PrismaService) {}
  create(userId: string, createTravelInput: CreateTravelInput) {
    return this.prisma.travel.create({
      data: {
        // title: createTravelInput.title,
        // content: createTravelInput.content,
        // authorId: userId,
        title: createTravelInput.title,
        content: createTravelInput.content,
        authorId: userId,
      },
    });
  }

  async findAll() {
    return this.prisma.travel.findMany();
  }

  findOne(id: number): CreateTravelInput {
    return {
      content: '',
      title: '',
    };
  }

  update(id: number, updateTravelInput: UpdateTravelInput) {
    return `This action updates a #${id} travel`;
  }

  remove(id: number) {
    return `This action removes a #${id} travel`;
  }
}
