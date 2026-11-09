import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CollectionService, Collection } from '../../services/collection-service';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './collection.html',
  styleUrl: './collection.css'
})

export class CollectionComponent implements OnInit {

  private collectionService = inject(CollectionService);

  protected collections: Collection[] = [];

  protected nouveauNom = '';

  protected modificationEnCours: number | null = null;

  protected nouveauNomModif = '';

  protected collectionSelectionnee: number | null = null;

  private cdr = inject(ChangeDetectorRef);


  // Chargement des collections au démarrage
  ngOnInit(): void {
    this.chargerCollections();
  }


  // GET : récupérer toutes les collections
  protected chargerCollections(): void {

    console.log('Chargement des collections...');

    this.collectionService.getCollections().subscribe({

      next: (data) => {

        console.log('Données reçues du backend :', data);

        this.collections = data;

        this.cdr.detectChanges();

      },

      error: (err) => {
        console.error('Erreur lors du chargement des collections :', err);
      }

    });
  }


  // POST : ajouter une collection
  protected ajouterCollection(): void {

    if (this.nouveauNom.trim() === '') {
      alert('Le nom de la collection est obligatoire !');
      return;
    }

    this.collectionService.addCollection(
      this.nouveauNom.trim()
    ).subscribe({

      next: () => {
        this.chargerCollections();
        this.nouveauNom = '';
      },

      error: (err) => {
        console.error('Erreur ajout collection', err);
      }

    });
  }


  // Préparer la modification
  protected modifierSelectionnee(): void {

    if (this.collectionSelectionnee === null) {
      alert('Sélectionne une collection à modifier !');
      return;
    }

    const collection = this.collections.find(
      c => c.id === this.collectionSelectionnee
    );

    if (collection) {
      this.modificationEnCours = collection.id;
      this.nouveauNomModif = collection.nom;
    }
  }


  // PUT : enregistrer la modification
  protected enregistrerModification(): void {

    if (this.modificationEnCours === null) return;

    if (this.nouveauNomModif.trim() === '') {
      alert('Le nom de la collection est obligatoire !');
      return;
    }

    this.collectionService.updateCollection(
      this.modificationEnCours,
      this.nouveauNomModif.trim()
    ).subscribe({

      next: () => {
        this.chargerCollections();
        this.annulerModification();
        this.collectionSelectionnee = null;
      },

      error: (err) => {
        console.error('Erreur modification collection', err);
      }

    });
  }


  // Annuler la modification
  protected annulerModification(): void {

    this.modificationEnCours = null;
    this.nouveauNomModif = '';

  }


  // DELETE : supprimer une collection
  protected supprimerSelectionnee(): void {

    if (this.collectionSelectionnee === null) {
      alert('Sélectionne une collection à supprimer !');
      return;
    }

    if (!confirm('Voulez-vous vraiment supprimer cette collection ?')) {
      return;
    }

    this.collectionService.removeCollection(
      this.collectionSelectionnee
    ).subscribe({

      next: () => {
        this.chargerCollections();
        this.collectionSelectionnee = null;
      },

      error: (err) => {
        console.error('Erreur suppression collection', err);
      }

    });
  }

}