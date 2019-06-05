import { HttpProvider } from '../core/http/http';

export class ProviderHelper {

  public static async makeRequest(http: HttpProvider, tipo:string, body?:any) {

    return await http.send(tipo, body).toPromise()
    .then(
      (data:any) => {
        return data._body
      }
    )
    .catch(
      (error:any) => {
        let { name, message } = error
        
        return {
          error: {
            name: name,
            message: message
          }
        }
      }
    )
  }

  public static get(http: HttpProvider) {
    return this.makeRequest(http, 'get')
  }
  
  public static delete(http: HttpProvider) {
    return this.makeRequest(http, 'delete')
  }
  
  public static post(http: HttpProvider, object:any) {
    return this.makeRequest(http, 'post', object)
  }
  
  public static put(http: HttpProvider, object:any) {
    return this.makeRequest(http, 'put', object)
  }
  
  public static patch(http: HttpProvider, object:any) {
    return this.makeRequest(http, 'patch', object)
  }
}