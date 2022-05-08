import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CardService } from './cards/cards.service';
import { CardDto } from './database/dto/card.dto';
import { ScrapeService } from './scrape.service';

@Injectable()
export class CronService {

  constructor(
    private scrapeService: ScrapeService,
    private cardService: CardService,
    private mailerService: MailerService
  ) {

  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async handleCron() {

    let cards = await this.cardService.findAll()

    cards.forEach(async (card: CardDto) => {

      card.price = await this.scrapeService.scrapeData(card.link)

      if (card.price <= card.threshold) {

        this.mailerService.sendMail({
          to: card.email, // list of receivers
          from: 'matteo.savina@gmail.com', // sender address
          subject: `${card.name} è sottoprezzata`, // Subject line
          template: 'foundCard',
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

      this.cardService.update(card)
    })
  }
}

