import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { LivreService } from '../../services/livre-service';
import { AuteurService } from '../../services/auteur-service';
import { EditeurService } from '../../services/editeur-service';
import { CollectionService } from '../../services/collection-service';
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
    private auteurService: AuteurService,
    private editeurService: EditeurService,
    private collectionService: CollectionService,
    private genreService: GenreService
  ) {
    this.resetFormLivre();
  }

  // Chargement des livres
  protected livres = rxResource({
    stream: () => this.livreService.findAll()
  });

  // Intégration dynamique via les services du groupe
  protected auteursResource = rxResource({ stream: () => this.auteurService.findAll() });
  protected editeursResource = rxResource({ stream: () => this.editeurService.findAll() });
  protected collectionsResource = rxResource({ stream: () => this.collectionService.getCollections() });
  protected genresResource = rxResource({ stream: () => this.genreService.getAll() });

  protected get auteurs(): Auteur[] { return this.auteursResource.value() ?? []; }
  protected get editeurs(): Editeur[] { return this.editeursResource.value() ?? []; }
  protected get collections(): Collection[] { return this.collectionsResource.value() ?? []; }
  protected get genres(): Genre[] { return this.genresResource.value() ?? []; }

  protected formLivre!: Livre;
  protected isEditing: boolean = false;
  protected messageInfo: string | null = null;
  private messageTimeout: any;

  ngOnInit(): void {
    this.title.setTitle('Registre des Livres');
  }

  protected notifierIndisponible(element: string): void {
    this.messageInfo = `La page de gestion des ${element} n'est pas encore disponible.`;
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
    if (!this.formLivre.genre?.id) {
      alert('Le genre est obligatoire pour enregistrer un livre.');
      return;
    }
    if (!this.formLivre.auteur?.id) {
      alert('L\'auteur est obligatoire pour enregistrer un livre.');
      return;
    }
    if (!this.formLivre.editeur?.id) {
      alert('L\'éditeur est obligatoire pour enregistrer un livre.');
      return;
    }

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
    if (!this.formLivre.genre) {
      this.formLivre.genre = { id: undefined, libelle: '' };
    }
    this.isEditing = true;
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
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
      genre: { id: undefined, libelle: '' },
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
