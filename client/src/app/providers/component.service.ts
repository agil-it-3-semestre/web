import { Injectable } from '@angular/core';
import { HttpProvider } from '../core/http/http';
import { ProviderHelper } from './helper'
import { BasicsRequests } from './BasicsRequests';

@Injectable({
  providedIn: 'root'
})
export class ComponentProvider implements BasicsRequests {

  private urlBase:string = 'http://localhost:3000/api/v1/components'

  constructor( private http: HttpProvider) { 
  }

  public async getList() {
    
    this.http.url = this.urlBase
    return ProviderHelper.get(this.http)
  }

  public async get(componentId: number) {
    
    this.http.url = this.urlBase + '/' + componentId
    return ProviderHelper.get(this.http)
  }
  
  public async create(componentId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + componentId
    return ProviderHelper.post(this.http, object)
  }
  
  public async update(componentId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + componentId
    return ProviderHelper.put(this.http, object)
  }
  
  public async updateAttributes(componentId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + componentId
    return ProviderHelper.patch(this.http, object)
  }

  public async delete(componentId: number) {
    this.http.url = this.urlBase + '/' + componentId
    return ProviderHelper.delete(this.http)
  }
}