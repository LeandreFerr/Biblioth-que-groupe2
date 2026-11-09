import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { LivreService } from '../../services/livre-service';
import { Auteur, Collection, Editeur, Genre, GENRE_LABELS, Livre } from '../../models';
import { AuteurService } from '../../services/auteur-service';
import { EditeurService } from '../../service/editeur-service';
import { CollectionService } from '../../service/collection-service';

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
    private collectionService: CollectionService
  ) {
    this.resetFormLivre();
  }

  // Seul service géré directement par ce composant
  protected livres = rxResource({
    stream: () => this.livreService.findAll()
  });

  // Intégration dynamique via les services du groupe
  protected auteursResource = rxResource({ stream: () => this.auteurService.findAll() });
  protected editeursResource = rxResource({ stream: () => this.editeurService.findAll() });
  protected collectionsResource = rxResource({ stream: () => this.collectionService.getCollections() });

  protected get auteurs(): Auteur[] { return this.auteursResource.value() ?? []; }
  protected get editeurs(): Editeur[] { return this.editeursResource.value() ?? []; }
  protected get collections(): Collection[] { return this.collectionsResource.value() ?? []; }

  protected formLivre!: Livre;
  protected isEditing: boolean = false;
  protected messageInfo: string | null = null;
  private messageTimeout: any;
  
  protected readonly genres = Object.values(Genre);
  protected readonly genreLabels = GENRE_LABELS;

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
      genre: Genre.ROMAN,
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
