import { Injectable } from '@angular/core';
import { HttpProvider } from '../core/http/http';
import { ProviderHelper } from './helper'
import { BasicsRequests } from './BasicsRequests';

@Injectable({
  providedIn: 'root'
})
export class ItemProvider implements BasicsRequests {

  private urlBase:string = 'http://localhost:3000/api/v1/itens'

  constructor( private http: HttpProvider) { 
  }

  public async getList() {
    
    this.http.url = this.urlBase
    return ProviderHelper.get(this.http)
  }

  public async get(itemId: number) {
    
    this.http.url = this.urlBase + '/' + itemId
    return ProviderHelper.get(this.http)
  }
  
  public async create(itemId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + itemId
    return ProviderHelper.post(this.http, object)
  }
  
  public async update(itemId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + itemId
    return ProviderHelper.put(this.http, object)
  }
  
  public async updateAttributes(itemId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + itemId
    return ProviderHelper.patch(this.http, object)
  }

  public async delete(itemId: number) {
    this.http.url = this.urlBase + '/' + itemId
    return ProviderHelper.delete(this.http)
  }
}