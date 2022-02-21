import { Controller, Get } from "@nestjs/common";
import { ScrapeService } from "./scrape.service";

@Controller()
export class AppController {

  constructor(public scrapeService: ScrapeService) { }

  @Get()
  getHello() {
    return "Hello there"
  }


}
