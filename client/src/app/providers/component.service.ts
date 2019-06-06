import { Injectable } from '@angular/core';
import { Requests } from './Requests';
import { HttpProvider } from '../core/http/http';

@Injectable({
  providedIn: 'root'
})
export class ComponentProvider extends Requests {

  constructor(public http: HttpProvider) {
    super(http);
    this.setModule('components')
  }
}