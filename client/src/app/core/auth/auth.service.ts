import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { HttpProvider } from '../http/http';
import * as jwt from 'angular2-jwt-simple';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpProvider, private userService : UserService) { 

  }

  public async login(email : any, password : any ){
      const object = {
        email : email,
        password : password
    }
    this.http.url = "http://localhost:3000/api/v1/login"

    return await this.http.post(object).toPromise()
    .then(
        (data:any) => {
  
          let response = data._body
  
          let json = {
            id: response.id,
            name: response.name,
            email: response.email
          }
  
          var token = jwt.encode(json, 'noisépika');
  
          this.userService.setToken(token);
      
          return true;
        }
    )
    .catch(
      (error:any) => {
        return false;
      }
    )
    
  }

  // authenticate(userName: string, password: string) {

  //   let id=1

  //   let secret='chave-secreta-do-jwt'
  //   let json={
  //     "id": id,
  //     "name": userName
  //   }

  
  // }
}