import { Injectable } from '@angular/core';
import { HttpProvider } from '../core/http/http';
import { ProviderHelper } from './helper'
import { BasicsRequests } from './BasicsRequests';

@Injectable({
  providedIn: 'root'
})
export class StorageProvider implements BasicsRequests {

  private urlBase:string = 'http://localhost:3000/api/v1/storages'

  constructor( private http: HttpProvider) { 
  }

  public async getList() {
    
    this.http.url = this.urlBase
    return ProviderHelper.get(this.http)
  }

  public async get(storageId: number) {
    
    this.http.url = this.urlBase + '/' + storageId
    return ProviderHelper.get(this.http)
  }
  
  public async create(storageId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + storageId
    return ProviderHelper.post(this.http, object)
  }
  
  public async update(storageId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + storageId
    return ProviderHelper.put(this.http, object)
  }
  
  public async updateAttributes(storageId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + storageId
    return ProviderHelper.patch(this.http, object)
  }

  public async delete(storageId: number) {
    this.http.url = this.urlBase + '/' + storageId
    return ProviderHelper.delete(this.http)
  }
}