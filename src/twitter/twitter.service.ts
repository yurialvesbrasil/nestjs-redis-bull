import { Twitter } from './entities/twitter.entity';
import { Injectable } from '@nestjs/common';
import { CreateTwitterDto } from './dto/create-twitter.dto';
import { UpdateTwitterDto } from './dto/update-twitter.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TwitterService {
  constructor(
    @InjectModel(Twitter)
    private tweeterModel: typeof Twitter,
  ) {}
  create(createTwitterDto: CreateTwitterDto) {
    return this.tweeterModel.create(createTwitterDto as any);
  }

  findAll() {
    return this.tweeterModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} twitter`;
  }

  update(id: number, updateTwitterDto: UpdateTwitterDto) {
    return `This action updates a #${id} twitter`;
  }

  remove(id: number) {
    return `This action removes a #${id} twitter`;
  }
}
