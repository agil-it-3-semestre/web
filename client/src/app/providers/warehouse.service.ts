import { Injectable } from '@angular/core';
import { HttpProvider } from '../core/http/http';
import { ProviderHelper } from './helper'
import { BasicsRequests } from './BasicsRequests';

@Injectable({
  providedIn: 'root'
})
export class WarehouseProvider implements BasicsRequests {

  private urlBase:string = 'http://localhost:3000/api/v1/warehouses'

  constructor( private http: HttpProvider) { 
  }

  public async getList() {
    
    this.http.url = this.urlBase
    return ProviderHelper.get(this.http)
  }

  public async get(object:any) {
    
    this.http.url = this.urlBase + '/get'
    return ProviderHelper.post(this.http, object)
  }
  
  public async create(object:any) {
    
    this.http.url = this.urlBase
    return ProviderHelper.post(this.http, object)
  }
  
  public async update(object:any) {
    
    this.http.url = this.urlBase
    return ProviderHelper.put(this.http, object)
  }
  
  public async updateAttributes(object:any) {
    
    this.http.url = this.urlBase
    return ProviderHelper.patch(this.http, object)
  }

  public async delete(object: any) {
    this.http.url = this.urlBase + '/delete'
    return ProviderHelper.post(this.http, object)
  }
}