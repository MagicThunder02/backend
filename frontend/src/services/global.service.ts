import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public darkmode: string = 'false';

  constructor() { }


  public getEmail(): string {
    return localStorage.getItem('email').trim()
  }
}
