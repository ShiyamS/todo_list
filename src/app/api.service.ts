import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getMessage(): Observable<data> {
    return this.http.get<data>('http://localhost:3000/api/message');
  }
}

interface data {
  message: string;
}
