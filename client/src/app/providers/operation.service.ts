import { Injectable } from '@angular/core';
import { ProviderHelper } from './helper'
import { Requests } from './Requests';
import { HttpProvider } from '../core/http/http';

@Injectable({
  providedIn: 'root'
})
export class OperationProvider extends Requests {

  constructor(public http: HttpProvider) {
    super(http);
    this.setModule('operations')
  }

  public async getComponentList(operatoinId: number) {
    
    this.http.url = this.getUrl() + '/' + operatoinId + '/components'
    return ProviderHelper.get(this.http)
  }
  
  public async getOperationBySequence(operatoinId: number, sequence: number) {
    
    this.http.url = this.getUrl() + '/' + operatoinId + '/components/' + sequence
    return ProviderHelper.get(this.http)
  }
}