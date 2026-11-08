import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Livre } from '../models';

@Service()
export class LivreService {
    private apiUrl: string = "http://localhost:8080/api/livre";
    private http: HttpClient = inject(HttpClient);

    public findAll(): Observable<Livre[]> {
        return this.http.get<Livre[]>(this.apiUrl);
    }

    public findById(id: number): Observable<Livre> {
        return this.http.get<Livre>(`${this.apiUrl}/${id}`);
    }

    public save(livre: Livre): Observable<Livre> {
        if (!livre.id) {
            return this.http.post<Livre>(this.apiUrl, livre);
        }
        return this.http.put<Livre>(`${this.apiUrl}/${livre.id}`, livre);
    }

    public remove(livre: Livre): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${livre.id}`);
    }

    public searchByTitre(titre: string): Observable<Livre[]> {
        return this.http.get<Livre[]>(`${this.apiUrl}/search?titre=${encodeURIComponent(titre)}`);
    }
}
