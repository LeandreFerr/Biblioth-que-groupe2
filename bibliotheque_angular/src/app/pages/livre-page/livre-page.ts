
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';

import { LivreService } from '../../services/livre-service';
import { GenreService } from '../../services/genre-service';

import { Auteur, Collection, Editeur, Genre, Livre } from '../../models';

@Component({
  imports: [FormsModule],
  selector: 'app-livre-page',
  styleUrl: './livre-page.css',
  templateUrl: './livre-page.html',
})
export class LivrePage implements OnInit {

  constructor(
    private title: Title,
    private livreService: LivreService,
    private genreService: GenreService
  ) {
    this.resetFormLivre();
  }

  // Chargement des livres
  protected livres = rxResource({
    stream: () => this.livreService.findAll()
  });

  // Chargement dynamique des genres depuis Spring Boot
  protected genres: Genre[] = [];

  // Données temporaires pour les sélecteurs
  protected auteurs: Auteur[] = [
    { id: 1, nom: 'Orwell', prenom: 'George', nationalite: 'Britannique' },
    { id: 2, nom: 'Herbert', prenom: 'Frank', nationalite: 'Américain' },
    { id: 3, nom: 'Hugo', prenom: 'Victor', nationalite: 'Français' },
    { id: 4, nom: 'Asimov', prenom: 'Isaac', nationalite: 'Américain' }
  ];

  protected editeurs: Editeur[] = [
    { id: 1, nom: 'Gallimard', pays: 'France' },
    { id: 2, nom: 'Folio', pays: 'France' },
    { id: 3, nom: 'Penguin Books', pays: 'Royaume-Uni' },
    { id: 4, nom: "J'ai Lu", pays: 'France' }
  ];

  protected collections: Collection[] = [
    { id: 1, nom: 'Science-Fiction' },
    { id: 2, nom: 'Classiques' },
    { id: 3, nom: 'Poche' }
  ];

  protected formLivre!: Livre;
  protected isEditing: boolean = false;
  protected messageInfo: string | null = null;

  private messageTimeout: any;

  ngOnInit(): void {
    this.title.setTitle('Registre des Livres');

    // Récupération des genres depuis l'API
    this.genreService.getAll().subscribe({
      next: (data) => {
        this.genres = data;
        console.log('Genres reçus :', data);

        // Sélectionner le premier genre par défaut
        if (this.genres.length > 0 && this.formLivre.genre === null) {
          this.formLivre.genre = this.genres[0];
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des genres :', err);
      }
    });
  }

  protected notifierIndisponible(element: string): void {
    this.messageInfo = `La page de gestion des ${element} n'est pas encore disponible (en attente du travail des copains).`;

    clearTimeout(this.messageTimeout);

    this.messageTimeout = setTimeout(() => {
      this.messageInfo = null;
    }, 4500);
  }

  protected fermerMessage(): void {
    this.messageInfo = null;
    clearTimeout(this.messageTimeout);
  }

  protected save(): void {
    this.livreService.save(this.formLivre).subscribe({
      next: () => {
        this.livres.reload();
        this.resetFormLivre();
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement :', err);
        alert('Erreur lors de l\'enregistrement du livre.');
      }
    });
  }

  protected edit(livre: Livre): void {
    this.formLivre = JSON.parse(JSON.stringify(livre));
    this.isEditing = true;

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  protected delete(livre: Livre): void {
    if (confirm(`Confirmez-vous la suppression du livre « ${livre.titre} » ?`)) {
      this.livreService.remove(livre).subscribe({
        next: () => {
          this.livres.reload();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert('Impossible de supprimer ce livre.');
        }
      });
    }
  }

  protected cancel(): void {
    this.resetFormLivre();
  }

  protected resetFormLivre(): void {
    this.isEditing = false;

    this.formLivre = {
      id: undefined,
      titre: '',
      resume: '',
      annee: new Date().getFullYear(),

      // Objet Genre au lieu de Genre.ROMAN
      genre: null,

      auteur: {
        id: undefined,
        nom: '',
        prenom: '',
        nationalite: ''
      },

      editeur: {
        id: undefined,
        nom: '',
        pays: ''
      },

      collection: null
    };
  }
}
