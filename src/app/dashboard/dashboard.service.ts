import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'
import { pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { Observable } from 'rxjs/observable';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: Http) { }

  private headersREST(): Headers {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    //myHeaders.append('Token', localStorage.getItem('token'));
    myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
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

  public areasService(): Observable<any> {
    let url = environment.basePath+'areas';
    return this.http.get(url, {
      headers: this.headersREST()}).pipe(
      map(response => {
        return response.json();
      }), pipe(catchError(this.handleError)))
  }

  public unidadMedidaService(): Observable<any> {
    let url = environment.basePath+'unidades_medida';
    return this.http.get(url, {
      headers: this.headersREST()}).pipe(map(response => {
        return response.json();
      }), pipe(catchError(this.handleError)))
  }

}
