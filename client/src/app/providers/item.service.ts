import { Injectable } from '@angular/core';
import { HttpProvider } from '../core/http/http';
import { Requests } from './Requests';

@Injectable({
  providedIn: 'root'
})
export class ItemProvider extends Requests {

  constructor(public http: HttpProvider){
    super(http);
    this.setModule('itens')
  }
  
}