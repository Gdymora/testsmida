import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiUserService {

  API = 'http://localhost:3000';

  DELETE_API_USER = `${this.API}/delete`;

  constructor(private httpClient: HttpClient) { }


  getDataUser(): Observable<any> {
    return this.httpClient.get(`${this.API}`);
  }

  deleteDataUser(delete_id: number): Observable<any> {
    return this.httpClient.get(`${this.DELETE_API_USER}/${delete_id}`);
  }


}

