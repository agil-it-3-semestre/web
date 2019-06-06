import { Injectable } from '@angular/core';
import { HttpProvider } from '../core/http/http';
import { ProviderHelper } from './helper'
import { Requests } from './Requests';

@Injectable({
  providedIn: 'root'
})
export class WarehouseProvider extends Requests {

  constructor(public http: HttpProvider){
    super(http);
    this.setModule('warehouses')
  }

  public async get(object:any) {
    
    this.http.url = this.getUrl() + '/get'
    return ProviderHelper.post(this.http, object)
  }
  
  public async create(object:any) {
    
    this.http.url = this.getUrl()
    return ProviderHelper.post(this.http, object)
  }
  
  public async update(object:any) {

    this.http.url = this.getUrl()
    return ProviderHelper.put(this.http, object)
  }
  
  public async updateAttributes(object:any) {
    
    this.http.url = this.getUrl()
    return ProviderHelper.patch(this.http, object)
  }

  public async delete(object: any) {
    this.http.url = this.getUrl() + '/delete'
    return ProviderHelper.post(this.http, object)
  }
}