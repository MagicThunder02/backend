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

    console.log("Start scraping");

    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    await page.goto(URL)


    //fetching the price
    let prices = await page.evaluate(() => {
      let divs = [...document.getElementsByClassName("col-price pr-sm-2")]
      divs.shift()
      let prices = divs.map(div => div.innerHTML)
      return prices
    })

    let priceArray = prices.map(price => this.parsePrice(price))

    await browser.close()

    return Math.max(...priceArray)
  }
}
