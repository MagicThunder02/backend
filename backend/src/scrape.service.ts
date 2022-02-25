import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as puppeteer from "puppeteer"
import { map } from 'rxjs';
import { CardDto } from './database/dto/card.dto';

@Injectable()
export class ScrapeService {

  constructor(public httpService: HttpService) { }

  private parsePrice(priceStr: string): number {
    priceStr = priceStr.slice(0, -2)
    priceStr = priceStr.replace(",", ".")
    return parseFloat(priceStr)
  }

  public async scapeData(URL: string) {

    // console.log("Start scraping");

    const browser = await puppeteer.launch({ headless: true })
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

    return this.parsePrice(price)
  }
}
