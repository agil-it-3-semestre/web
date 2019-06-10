import { BasicsRequests } from './BasicsRequests';
import { HttpProvider } from '../core/http/http';
import { ProviderHelper } from './helper'

export class Requests implements BasicsRequests {
    
  private version: number = 1
  private baseUrl: string = 'http://localhost:3000/api'
  private module: string = ''
  private url: string = ''

  constructor(public http: HttpProvider){
    this.setUrl()
  }

  public setModule(moduleApi:string) {
    this.module = moduleApi
    this.setUrl()
  }
  
  public setBaseUrl(baseUrl:string) {
    this.baseUrl = baseUrl
    this.setUrl()
  }
  
  public setVersion(version:number) {
    this.version = version
    this.setUrl()
  }

  private setUrl() {
    this.url = this.baseUrl + '/v' + this.version + '/' + this.module
  }

  public getUrl() {
    return this.url
  }
  
  public async getList() {
    
    this.http.url = this.url
    return ProviderHelper.get(this.http)
  }

  public async get(registryId: number, queryParams?: any) {

    let params = ''

    if (queryParams!==undefined && queryParams!==null && queryParams.length > 0) {
      queryParams.map((paramQuery:any) => {
        if (params == '') {
          params = '?'
        } else {
          params = params + '&'
        }

        params = params + paramQuery.name + '=' + paramQuery.value
      })
    }
    
    this.http.url = this.getUrl() + '/' + registryId + params
    return ProviderHelper.get(this.http)
  }
  
  public async create(object:any) {
    
    this.http.url = this.url
    return ProviderHelper.post(this.http, object)
  }
  
  public async update(registryId: number, object:any) {
    
    this.http.url = this.url + '/' + registryId
    return ProviderHelper.put(this.http, object)
  }
  
  public async updateAttributes(registryId: number, object:any) {
    
    this.http.url = this.url + '/' + registryId
    return ProviderHelper.patch(this.http, object)
  }

  public async delete(registryId: number) {
    this.http.url = this.url + '/' + registryId
    return ProviderHelper.delete(this.http)
  }
  
}