import { Injectable } from '@angular/core';
import { ProviderHelper } from './helper'
import { UserService } from '../core/user/user.service';
import { User } from '../core/user/user';
import { Requests } from './Requests';
import { HttpProvider } from '../core/http/http';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceOrderProvider extends Requests {

  constructor(public http: HttpProvider, private userService : UserService) {
    super(http);
    this.setModule('maintenance-orders')
  }

  public async assignOrder(orderId: number) {
    this.http.url = this.getUrl() + '/' + orderId + '/assign'
    let user:User = await this.userService.getUser().toPromise();

    return ProviderHelper.post(this.http, {
      userId: user.id
    })
  }

  public async getAssignatures(orderId: number) {
    
    this.http.url = this.getUrl() + '/' + orderId + '/assignatures'
    return ProviderHelper.get(this.http)
  }

  public async getOperationList(orderId: number) {
    
    this.http.url = this.getUrl() + '/' + orderId + '/operations'
    return ProviderHelper.get(this.http)
  }
  
  public async getOperationBySequence(orderId: number, sequence: number) {
    
    this.http.url = this.getUrl() + '/' + orderId + '/operations/' + sequence
    return ProviderHelper.get(this.http)
  }
}