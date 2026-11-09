import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private url = 'http://localhost:8090/api/genre';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.url);
  }
}