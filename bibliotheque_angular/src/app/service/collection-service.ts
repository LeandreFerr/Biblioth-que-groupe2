import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Collection {
  id: number;
  nom: string;
}

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private apiUrl = 'http://localhost:8080/api/collection';//'/api/collection';

  constructor(private http: HttpClient) {}

  // GET : récupérer toutes les collections
  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.apiUrl);
  }

  // GET : récupérer une collection par ID
  getCollection(id: number): Observable<Collection> {
    return this.http.get<Collection>(`${this.apiUrl}/${id}`);
  }

  // POST : ajouter une collection
  addCollection(nom: string): Observable<Collection> {
    return this.http.post<Collection>(
      this.apiUrl,
      { nom }
    );
  }

  // PUT : modifier une collection
  updateCollection(id: number, nom: string): Observable<Collection> {
    return this.http.put<Collection>(
      `${this.apiUrl}/${id}`,
      { nom }
    );
  }

  // DELETE : supprimer une collection
  removeCollection(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  // GET : rechercher une collection par nom
  searchCollections(recherche: string): Observable<Collection[]> {
    return this.http.get<Collection[]>(
      `${this.apiUrl}/search?recherche=${encodeURIComponent(recherche)}`
    );
  }
}
