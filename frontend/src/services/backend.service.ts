import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { GlobalService } from "./global.service";
import CryptoJS from 'crypto-js';

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

  public listCards() {
    let email = localStorage.getItem('email')
    let URL = this.apiUrl() + `/cards/email?email=${email}`
    console.log(URL);


    return this.http.get<any>(URL, { headers: this.options })
      .pipe(
        catchError(async (error) => console.log(error))
      );
  }

  public deleteCard(name) {

    let URL = this.apiUrl() + `/cards/delete`
    let body = new HttpParams();

    body = body.append('email', this.global.getEmail());
    body = body.append('name', name);

    console.log(URL);

    return this.http.post<any>(URL, body, { headers: this.options })
      .pipe(
        catchError(async (error) => console.log(error))
      );
  }

  public createCard(name, threshold) {

    let URL = this.apiUrl() + `/cards/create`
    let body = new HttpParams();

    body = body.append('email', this.global.getEmail());
    body = body.append('name', name);
    body = body.append('threshold', this.parsePrice(threshold));

    console.log(URL);

    return this.http.post<any>(URL, body, { headers: this.options })
      .pipe(
        catchError(async (error) => console.log(error))
      );
  }

  public updateCard(card) {

    let URL = this.apiUrl() + `/cards/update`
    let body = new HttpParams();


    Object.keys(card).forEach(key => {
      body = body.append(key, card[key])
      console.log(key, card[key]);
    })

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

  //--------------------------------------------------------------
  //--------------------------------------------------------------

  public createUser(email, password) {

    let URL = this.apiUrl() + `/users/create`
    let body = new HttpParams();

    body = body.append('email', email);
    body = body.append('password', CryptoJS.SHA1(password));

    console.log(URL);

    return this.http.post<any>(URL, body, { headers: this.options })
      .pipe(
        catchError(async (error) => console.log(error))
      );
  }

  public getUser(email) {
    let URL = this.apiUrl() + `/users/getUser?email=${email}`
    console.log(URL);


    return this.http.get<any>(URL, { headers: this.options })
      .pipe(
        catchError(async (error) => console.log(error))
      );
  }



}
