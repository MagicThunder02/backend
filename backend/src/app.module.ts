import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsModule } from './cards/cards.module';
import { ScrapeService } from './scrape.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { HttpModule } from '@nestjs/axios';
import { DBModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    CardsModule,
    DBModule,
    HttpModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DBPATH),
    MailerModule.forRoot({
      transport: {
        host: 'in-v3.mailjet.com',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "8c021e46869e3ba18b0b9042be015439",
          pass: "de385fe734a6c3d4c2246d0b4c59b4f2",
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: process.cwd() + '/src/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/cards*', '/db*'],
    }),
  ],
  controllers: [AppController],
  providers: [CronService, ScrapeService],
})
export class AppModule { }
