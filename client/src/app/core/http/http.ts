import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { timeout } from 'rxjs/operators';

@Injectable()
export class HttpProvider {
  public url : string;
  public token : string;

  private TIMEOUT = 15000;

  constructor(private http: Http){
    this.url = null;
    this.token = null;
  }

  private prepareHeaders(contentType : boolean){
    let headers = new Headers();
    headers.append('Accept', 'application/json');

    if (contentType){
      headers.append('Content-Type', 'application/json');
    }

    if (this.token == ''){
      this.token = null;
    }

    if (this.token != null){
      headers.append('Authorization', 'bearer ' + this.token);
    }

    return headers;
  }

  public get(){
    let headers = this.prepareHeaders(false);
    return this.http.get(
      this.url, 
      {headers: headers}
    ).pipe(
      timeout(this.TIMEOUT)
    )
  }

  public post(object : any){
    let body : string = '';

    let headers = this.prepareHeaders(true);

    if (object != null && object != undefined){
      body = JSON.stringify(object);
    }

    return this.http.post(this.url, body, {headers: headers}).pipe(timeout(this.TIMEOUT));
  }

  public put(object : any){
    let body : string = '';

    let headers = this.prepareHeaders(true);

    if (object != null && object != undefined){
      body = JSON.stringify(object);
    }

    return this.http.put(this.url, body, {headers: headers}).pipe(timeout(this.TIMEOUT));
  }

  public patch(object : any){
    let body : string = '';

    let headers = this.prepareHeaders(true);

    if (object != null && object != undefined){
      body = JSON.stringify(object);
    }

    return this.http.patch(this.url, body, {headers: headers}).pipe(timeout(this.TIMEOUT));
  }
}