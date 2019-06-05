import { Injectable } from '@angular/core';
import { HttpProvider } from '../core/http/http';
import { ProviderHelper } from './helper'
import { BasicsRequests } from './BasicsRequests';

@Injectable({
  providedIn: 'root'
})
export class UnitMeasurementProvider implements BasicsRequests {

  private urlBase:string = 'http://localhost:3000/api/v1/units-measurement'

  constructor( private http: HttpProvider) { 
  }

  public async getList() {
    
    this.http.url = this.urlBase
    return ProviderHelper.get(this.http)
  }

  public async get(operatoinId: number) {
    
    this.http.url = this.urlBase + '/' + operatoinId
    return ProviderHelper.get(this.http)
  }
  
  public async create(operatoinId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + operatoinId
    return ProviderHelper.post(this.http, object)
  }
  
  public async update(operatoinId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + operatoinId
    return ProviderHelper.put(this.http, object)
  }
  
  public async updateAttributes(operatoinId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + operatoinId
    return ProviderHelper.patch(this.http, object)
  }

  public async delete(operatoinId: number) {
    this.http.url = this.urlBase + '/' + operatoinId
    return ProviderHelper.delete(this.http)
  }
}