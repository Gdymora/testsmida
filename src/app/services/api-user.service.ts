import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ApiUserService {

  API = 'http://localhost:3000';

  DELETE_API_USER = `${this.API}/delete`;

  constructor(private httpClient: HttpClient) { }


  postFile(fileToUpload: File): Observable<Object> {   
    const formData: FormData = new FormData();
    formData.append('picture', fileToUpload);
    return this.httpClient.post(`${this.API}/upload`, formData).pipe( map(() => { return true; }));
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.API}/files`);
  }


}

