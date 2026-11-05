import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Editeur } from '../model/editeur';

@Service()
export class EditeurService {

    private apiUrl: string = "http://localhost:8080/api/editeur";
//pour tester avant de faire un chemin commun a toute les pages j'ai mis le chemin complet de spring que plutot "/editeur"
 
    private http: HttpClient = inject(HttpClient);

public findAll(): Observable<Editeur[]> {
    return this.http.get<Editeur[]>(this.apiUrl);
  }

  public save(editeur: Editeur): Observable<Editeur> {
    if (!editeur.id) {
      return this.http.post<Editeur>(this.apiUrl, editeur);
    }

    return this.http.put<Editeur>(`${ this.apiUrl }/${ editeur.id }`, editeur);
  }

  public remove(editeur: Editeur): Observable<void> {
    return this.http.delete<void>(`${ this.apiUrl }/${ editeur.id }`);
  }







}
