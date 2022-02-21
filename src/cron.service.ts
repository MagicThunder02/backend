import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CardsService } from './cards/cards.service';
import { ScrapeService } from './scrape.service';

@Injectable()
export class CronService {

  constructor(public scrapeService: ScrapeService, public cardsService: CardsService, public mailerService: MailerService) {

  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {

    let cards = await this.cardsService.findAll()

    for (let card of cards) {

      let result = await this.scrapeService.scapeData(card)

      if (result.price <= result.threshold) {

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
            console.log("MAIL INVIATA");
            console.log(success)
          })
          .catch((err) => {
            console.log("MAIL FALLITA");
            console.log(err)
          });
      }

      this.cardsService.update(result)
    }
  }
}

