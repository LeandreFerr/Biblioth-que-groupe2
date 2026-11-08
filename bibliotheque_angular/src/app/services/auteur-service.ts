
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auteur } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuteurService {
  private apiUrl: string = "http://localhost:8080/api/auteur";
  private http: HttpClient = inject(HttpClient);

  public findAll(): Observable<Auteur[]> {
    return this.http.get<Auteur[]>(this.apiUrl);
  }

  public findById(id: number): Observable<Auteur> {
          return this.http.get<Auteur>(`${this.apiUrl}/${id}`);
      }

  public save(auteur: Auteur): Observable<Auteur> {
    if (!auteur.id) {
      return this.http.post<Auteur>(this.apiUrl, auteur);
    }
    return this.http.put<Auteur>(`${ this.apiUrl }/${ auteur.id }`, auteur);
  }

  public remove(auteur: Auteur): Observable<void> {
    return this.http.delete<void>(`${ this.apiUrl }/${ auteur.id }`);
  }
}
