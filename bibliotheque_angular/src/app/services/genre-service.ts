import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../model/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private apiUrl = 'http://localhost:8090/api/genre';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl);
  }
}