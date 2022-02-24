import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public darkmode: string = 'false';
  public email: string

  constructor() { }
}
