import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private url = 'http://localhost:8080/api/genre';

  constructor(private http: HttpClient) {}

  // READ
  getAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.url);
  }

  // READ BY ID
  getById(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.url}/${id}`);
  }

  // CREATE
  ajouter(libelle: string): Observable<Genre> {
    return this.http.post<Genre>(this.url, { libelle });
  }

  // UPDATE
  modifier(id: number, libelle: string): Observable<Genre> {
    return this.http.put<Genre>(`${this.url}/${id}`, { libelle });
  }

  // DELETE
  supprimer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}