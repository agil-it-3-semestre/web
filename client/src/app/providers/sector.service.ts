import { Injectable } from '@angular/core';
import { HttpProvider } from '../core/http/http';
import { ProviderHelper } from './helper'
import { BasicsRequests } from './BasicsRequests';

@Injectable({
  providedIn: 'root'
})
export class SectorProvider implements BasicsRequests {

  private urlBase:string = 'http://localhost:3000/api/v1/sectors'

  constructor( private http: HttpProvider) { 
  }

  public async getList() {
    
    this.http.url = this.urlBase
    return ProviderHelper.get(this.http)
  }

  public async get(sectorId: number) {
    
    this.http.url = this.urlBase + '/' + sectorId
    return ProviderHelper.get(this.http)
  }
  
  public async create(sectorId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + sectorId
    return ProviderHelper.post(this.http, object)
  }
  
  public async update(sectorId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + sectorId
    return ProviderHelper.put(this.http, object)
  }
  
  public async updateAttributes(sectorId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + sectorId
    return ProviderHelper.patch(this.http, object)
  }

  public async delete(sectorId: number) {
    this.http.url = this.urlBase + '/' + sectorId
    return ProviderHelper.delete(this.http)
  }
}