import { Injectable } from '@angular/core';
import { HttpProvider } from '../core/http/http';
import { ProviderHelper } from './helper'
import { Requests } from './Requests';

@Injectable({
  providedIn: 'root'
})
export class EquipmentProvider extends Requests {

  constructor(public http: HttpProvider) {
    super(http);
    this.setModule('equipments')
  }

}