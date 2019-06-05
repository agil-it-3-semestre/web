import { Injectable } from '@angular/core';
import { HttpProvider } from '../core/http/http';
import { ProviderHelper } from './helper'
import { UserService } from '../core/user/user.service';
import { User } from '../core/user/user';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceOrderProvider {

  private urlBase:string = 'http://localhost:3000/api/v1/maintenance-orders'

  constructor( private http: HttpProvider, private userService : UserService) { 
  }

  public async getList() {
    
    this.http.url = this.urlBase
    return ProviderHelper.get(this.http)
  }

  public async get(orderId: number) {
    
    this.http.url = this.urlBase + '/' + orderId
    return ProviderHelper.get(this.http)
  }
  
  public async create(orderId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + orderId
    return ProviderHelper.post(this.http, object)
  }
  
  public async update(orderId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + orderId
    return ProviderHelper.put(this.http, object)
  }
  
  public async updateAttributes(orderId: number, object:any) {
    
    this.http.url = this.urlBase + '/' + orderId
    return ProviderHelper.patch(this.http, object)
  }
  
  public async delete(orderId: number) {
    this.http.url = this.urlBase + '/' + orderId
    return ProviderHelper.delete(this.http)
  }

  public async assignOrder(orderId: number) {
    this.http.url = this.urlBase + '/' + orderId + '/assign'
    let user:User = await this.userService.getUser().toPromise();

    return ProviderHelper.post(this.http, {
      userId: user.id
    })
  }

  public async getAssignatures(orderId: number) {
    
    this.http.url = this.urlBase + '/' + orderId + '/assignatures'
    return ProviderHelper.get(this.http)
  }

  public async getOperationList(orderId: number) {
    
    this.http.url = this.urlBase + '/' + orderId + '/operations'
    return ProviderHelper.get(this.http)
  }
  
  public async getOperationBySequence(orderId: number, sequence: number) {
    
    this.http.url = this.urlBase + '/' + orderId + '/operations/' + sequence
    return ProviderHelper.get(this.http)
  }
}