import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Twitter } from '../entities/twitter.entity';
import { Cache } from 'cache-manager';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class TweetsCountService {
  private limit = 10;
  constructor(
    @InjectModel(Twitter)
    private readonly tweeterModel: typeof Twitter,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectQueue('emails')
    private emailsQueue: Queue,
  ) {}
  @Interval(5000) //cronjob
  async countTweets(): Promise<number> {
    let tweetsCount = await this.cacheManager.get<number>('tweets-offset');
    tweetsCount = tweetsCount !== undefined ? tweetsCount : 0;
    const tweets = await this.tweeterModel.findAll({
      offset: tweetsCount,
      limit: this.limit,
    });

    if (tweets.length === this.limit) {
      tweetsCount += this.limit;
      this.cacheManager.set('tweets-offset', tweetsCount, { ttl: 1 * 60 * 10 });
      console.log(`Novo limite de ${tweetsCount} tweets`);
      //Adiciona tweets na fila para o envio de emails de forma assincrona
      this.emailsQueue.add({ tweets: tweets.map((t: Twitter) => t.toJSON()) });
    }
    return tweets.length;
  }
}
