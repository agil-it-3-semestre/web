import { Injectable } from '@angular/core';
import { HttpProvider } from '../core/http/http';
import { ProviderHelper } from './helper'
import { BasicsRequests } from './BasicsRequests';

@Injectable({
  providedIn: 'root'
})
export class UserProvider implements BasicsRequests {

  private urlBase:string = 'http://localhost:3000/api/v1/users'

  constructor( private http: HttpProvider) { 
  }

  public async getList() {
    
    this.http.url = this.urlBase
    return ProviderHelper.get(this.http)
  }

  public async get(userId: number) {
    
    this.http.url = this.urlBase + '/' + userId
    return ProviderHelper.get(this.http)
  }
  
  public async create(userId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + userId
    return ProviderHelper.post(this.http, object)
  }
  
  public async update(userId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + userId
    return ProviderHelper.put(this.http, object)
  }
  
  public async updateAttributes(userId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + userId
    return ProviderHelper.patch(this.http, object)
  }

  public async delete(userId: number) {
    this.http.url = this.urlBase + '/' + userId
    return ProviderHelper.delete(this.http)
  }
}