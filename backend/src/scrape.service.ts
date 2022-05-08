import { MailerService } from '@nestjs-modules/mailer';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as puppeteer from "puppeteer"


@Injectable()
export class ScrapeService {

  constructor(private mailerService: MailerService) { }

  private parsePrice(priceStr: string): number {
    priceStr = priceStr.slice(0, -2)
    priceStr = priceStr.replace(",", ".")
    return parseFloat(priceStr)
  }

  public async scrapeData(URL: string) {
    try {

      console.log("Start scraping", URL);

      const browser = await puppeteer.launch({
        executablePath: process.env.CHROME_BIN || null,
        args: ['--no-sandbox', '--headless', '--disable-gpu']
      })
      const page = await browser.newPage()

      await page.goto(URL)

      //fetching the price
      //di solito il link punta a una pagina con una lista di prezzi, se puntasse ad un altra prova con la seconda
      let price = await page.evaluate(() => {

        let result
        let divs = [...document.getElementsByClassName("col-price pr-sm-2")]

        if (divs.length != 0) {
          //prima pagina
          divs.shift()
          result = divs[0].innerHTML
        }
        else {
          //seconda pagina
          divs = [...document.getElementsByClassName("col-6 col-xl-7")]
          result = divs[4].innerHTML
        }

        return result
      })

      await browser.close()

      console.log("Finished!", this.parsePrice(price));


      return this.parsePrice(price)

    } catch (error) {
      console.log(error);
      this.mailerService.sendMail({
        to: 'matteo.savina@gmail.com', // list of receivers
        from: 'matteo.savina@gmail.com', // sender address
        subject: `Errore`, // Subject line
        template: 'error',
        context: {
          error: error,
          link: URL
        }
      })
        .then((success) => {
          console.log("MAIL DI ERRORE INVIATA");
        })
        .catch((err) => {
          console.log("MAIL DI ERRORE FALLITA");
          console.log(err)
        });
    }
    return "PRICE_NOT_FOUND"
  }
}

