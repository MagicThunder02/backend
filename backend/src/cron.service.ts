import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DBService } from './database/database.service';
import { ScrapeService } from './scrape.service';

@Injectable()
export class CronService {

  constructor(public scrapeService: ScrapeService, public dbService: DBService, public mailerService: MailerService) {

  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async handleCron() {

    let cards = await this.dbService.findAll()

    for (let card of cards) {

      card.price = await this.scrapeService.scapeData(card.link)

      if (card.price <= card.threshold) {

        this.mailerService.sendMail({
          to: card.email, // list of receivers
          from: 'matteo.savina@gmail.com', // sender address
          subject: `${card.name} è sottoprezzata`, // Subject line
          template: '/mail',
          context: {
            name: card.name,
            price: card.price,
            threshold: card.threshold
          }
        })
          .then((success) => {
            console.log("MAIL INVIATA A", card.email);
          })
          .catch((err) => {
            console.log("MAIL FALLITA");
            console.log(err)
          });
      }

      this.dbService.update(card)
    }
  }
}

