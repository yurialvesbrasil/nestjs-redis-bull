import { BullModule } from '@nestjs/bull';
import { CacheModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitterModule } from './twitter/twitter.module';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [
    ScheduleModule.forRoot(), // Para criar tarefas em background
    BullModule.forRoot({
      // Usa o redis para enfileirar requisições de tarefas
      redis: {
        host: '127.0.0.1',
        port: 6379,
        password: '123456',
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: join(__dirname, 'database.sqlite'),
      autoLoadModels: true,
      synchronize: true, // Quando criar mais campos atualiza o banco de dados automaticamente
    }),
    CacheModule.register(),
    TwitterModule,
    MailingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
