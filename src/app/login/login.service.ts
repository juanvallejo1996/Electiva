import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'
import { pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  private headersREST(): Headers {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    return myHeaders
  }

  private handleError(error: Response) {
    const setError = (error[`_body`]) ? JSON.parse(error[`_body`]) : error.statusText;
    const json = {
      Errors: setError,
      Resultado: [],
      EsExitoso: false,
      Status: error.status
    };
    return Observable.throw(json);
  }

  public loginSuccesful(email: string, password: string):Observable<any> {
    //return this.http.post(`https://proyectoelectiva.herokuapp.com/signin`
    return this.http.post(environment.basePath+'signin'
      , { email, password },{headers : this.headersREST()})
      .pipe(map(res => {
        //return localStorage.setItem('access_token',res.token);
        return res.json();
      }), pipe(catchError(this.handleError)))
  }

}
