import { BullModule } from '@nestjs/bull';
import { CacheModule, Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Twitter } from './entities/twitter.entity';
import { TweetsCountService } from './tweets-count/tweets-count.service';

@Module({
  imports: [
    CacheModule.register(),
    SequelizeModule.forFeature([Twitter]),
    BullModule.registerQueue({ name: 'emails' }),
  ],
  controllers: [TwitterController],
  providers: [TwitterService, TweetsCountService],
})
export class TwitterModule {}
