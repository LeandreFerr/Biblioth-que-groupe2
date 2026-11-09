import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Genre, GENRE_LABELS } from '../../models/genre';
import { GenreService } from '../../services/genre-service';

@Component({
  selector: 'app-genre-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genre-page.html'
})
export class GenrePage implements OnInit {

  genres: Genre[] = [];

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.chargerGenres();
  }

  chargerGenres(): void {
    this.genreService.getAll().subscribe({
      next: (data) => {
        this.genres = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des genres', err);
      }
    });
  }
}