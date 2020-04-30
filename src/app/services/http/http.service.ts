import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environments/custom';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private URL: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private storage: StorageService) { 
    this.URL = API_URL;
    this.setOptions();
    }

  setOptions = () => { 
    this.storage.retrieveToken().then(authToken => { 
      this.headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token': String(authToken),
        returnType: 'json'
      });
    })
  }

  get = <TResponse>(endpoint: string): Observable<TResponse> =>
    this.http.get<TResponse>(`${this.URL}${endpoint}`, { headers: this.headers });

  // get = (endpoint: string) => {
  //   this.http.get(`${this.URL}${endpoint}`, { headers: this.headers })
  //   .pipe(map(res => { console.log(res); return res })).subscribe();
  // }
  
}
