import { Injectable } from '@angular/core';
import { HttpProvider } from '../core/http/http';
import { ProviderHelper } from './helper'
import { BasicsRequests } from './BasicsRequests';

@Injectable({
  providedIn: 'root'
})
export class EquipmentProvider implements BasicsRequests {

  private urlBase:string = 'http://localhost:3000/api/v1/equipments'

  constructor( private http: HttpProvider) { 
  }

  public async getList() {
    
    this.http.url = this.urlBase
    return ProviderHelper.get(this.http)
  }

  public async get(equipmentId: number) {
    
    this.http.url = this.urlBase + '/' + equipmentId
    return ProviderHelper.get(this.http)
  }
  
  public async create(equipmentId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + equipmentId
    return ProviderHelper.post(this.http, object)
  }
  
  public async update(equipmentId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + equipmentId
    return ProviderHelper.put(this.http, object)
  }
  
  public async updateAttributes(equipmentId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + equipmentId
    return ProviderHelper.patch(this.http, object)
  }

  public async delete(equipmentId: number) {
    this.http.url = this.urlBase + '/' + equipmentId
    return ProviderHelper.delete(this.http)
  }
}