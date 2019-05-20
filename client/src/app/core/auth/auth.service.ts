import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import * as jwt from 'angular2-jwt-simple';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService) { }

  authenticate(userName: string, password: string) {

    let id=1

    let secret='chave-secreta-do-jwt'
    let json={
      "id": id,
      "name": userName
    }

    var token = jwt.encode(json, secret);

    this.userService.setToken(token);

    return true;
  }
}