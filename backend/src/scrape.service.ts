import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as puppeteer from "puppeteer"
import { CardDto } from './cards/dto/card.dto';

@Injectable()
export class ScrapeService {

  constructor() { }

  private parsePrice(priceStr: string): number {
    priceStr = priceStr.slice(0, -2)
    priceStr = priceStr.replace(",", ".")
    return parseFloat(priceStr)
  }

  public async scapeData(card: CardDto) {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(card.link)


    //fetching the name
    card.name = await page.evaluate(() => {
      let tags = document.querySelectorAll("h1")
      return tags[0].innerText.split("\n")[0]
    })


    //fetching the price
    let priceStr = await page.evaluate(() => {
      let tags = document.querySelectorAll("dd")
      return tags[5].innerText
    })
    card.price = this.parsePrice(priceStr)

    await browser.close()

    return card
  }
}
