import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiURL = 'http://34.237.214.147/back/api_guerreros/api';

  headers = new HttpHeaders();
  loader: boolean = false;
  showHeader: boolean = true;
  color: string = "";
  user: string = "";
  lenguaje: number = 1;


  public post(url, parametros): Observable<any> {
    return this.http.post(this.apiURL + url, parametros, { headers: this.headers });
  }

  public put(url, parametros): Observable<any> {
    return this.http.put(this.apiURL + url, parametros, { headers: this.headers });
  }


  public get(url): Observable<any> {
    return this.http.get(this.apiURL + url, { headers: this.headers });
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(this.apiURL + url, { headers: this.headers });
  }

  public delete_with_url(url): Observable<any> {
    return this.http.delete(this.apiURL + url, { headers: this.headers });
  }


  GetprogramApoyobyId(id) {
    var head = new HttpHeaders();
    head.append('Content-Type', 'application/json');

    const headerDict = {
      'Content-Type': 'text/html; charset=utf-8',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get(`${this.apiURL}/BackOffice/BackOfficeGetSupportProgramsDetail?supportProgramId=${id}`, requestOptions);
  }


}
