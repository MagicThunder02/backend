import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { GlobalService } from "./global.service";


@Injectable()
export class BackendService {

  private options: HttpHeaders = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');


  constructor(public http: HttpClient, private global: GlobalService,) { }

  public apiUrl() {
    return environment.backend
  }

  private parsePrice(priceStr: string): number {
    priceStr = priceStr.toString()
    priceStr = priceStr.replace(",", ".")
    return parseFloat(priceStr)
  }

  public list() {

    let URL = this.apiUrl() + `/db/email?email=${this.global.email}`
    console.log(URL);

    return this.http.get<any>(URL, { headers: this.options })
      .pipe(
        catchError(async (error) => console.log(error))
      );
  }

  public delete(name) {

    let URL = this.apiUrl() + `/db/delete`
    let body = new HttpParams();

    body = body.append('email', this.global.email);
    body = body.append('name', name);

    console.log(URL);

    return this.http.post<any>(URL, body, { headers: this.options })
      .pipe(
        catchError(async (error) => console.log(error))
      );
  }

  public create(name, threshold) {

    let URL = this.apiUrl() + `/db/create`
    let body = new HttpParams();

    body = body.append('email', this.global.email);
    body = body.append('name', name);
    body = body.append('threshold', this.parsePrice(threshold));

    console.log(URL);

    return this.http.post<any>(URL, body, { headers: this.options })
      .pipe(
        catchError(async (error) => console.log(error))
      );
  }

  public update(name, threshold) {

    let URL = this.apiUrl() + `/db/update`
    let body = new HttpParams();

    body = body.append('email', this.global.email);
    body = body.append('name', name);
    body = body.append('threshold', this.parsePrice(threshold));

    console.log(URL);

    return this.http.post<any>(URL, body, { headers: this.options })
      .pipe(
        catchError(async (error) => console.log(error))
      );
  }

  public autocomplete(search) {

    let URL = this.apiUrl() + `/cards/autocomplete?search=${search}`
    console.log(URL);

    return this.http.get<any>(URL, { headers: this.options })
      .pipe(
        catchError(async (error) => console.log(error))
      );
  }



}
