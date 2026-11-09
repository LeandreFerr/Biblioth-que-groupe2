import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Genre } from '../../models/genre';
import { GenreService } from '../../services/genre-service';

@Component({
  selector: 'app-genre-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './genre-page.html'
})
export class GenrePage implements OnInit {

  genres: Genre[] = [];

  libelle: string = '';
  genreEnCours: Genre | null = null;

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.chargerGenres();
  }

  // READ
  chargerGenres(): void {
    this.genreService.getAll().subscribe({
      next: (data) => {
        this.genres = data;
      },
      error: (err) => {
        console.error('Erreur de chargement :', err);
      }
    });
  }

  // CREATE / UPDATE
  ajouterOuModifier(): void {

    if (!this.libelle.trim()) {
      return;
    }

    if (this.genreEnCours && this.genreEnCours.id != null) {

      // UPDATE
      this.genreService.modifier(
        this.genreEnCours.id,
        this.libelle
      ).subscribe({
        next: () => {
          this.chargerGenres();
          this.annuler();
        },
        error: (err) => console.error('Erreur de modification :', err)
      });

    } else {

      // CREATE
      this.genreService.ajouter(this.libelle).subscribe({
        next: () => {
          this.chargerGenres();
          this.annuler();
        },
        error: (err) => console.error('Erreur d’ajout :', err)
      });
    }
  }

  // Préparer la modification
  modifier(genre: Genre): void {
    this.genreEnCours = genre;
    this.libelle = genre.libelle;
  }

  // DELETE
  supprimer(genre: Genre): void {

    if (genre.id != null && confirm(`Supprimer le genre "${genre.libelle}" ?`)) {

      this.genreService.supprimer(genre.id).subscribe({
        next: () => {
          this.chargerGenres();

          if (this.genreEnCours?.id === genre.id) {
            this.annuler();
          }
        },
        error: (err) => console.error('Erreur de suppression :', err)
      });
    }
  }

  // Annuler le formulaire
  annuler(): void {
    this.libelle = '';
    this.genreEnCours = null;
  }
}