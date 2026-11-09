import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Genre } from '../../models/genre';
import { GenreService } from '../../services/genre-service';

@Component({
  selector: 'app-genre-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genre-page.html'
})

export class GenrePage implements OnInit {

  genres: Genre[] = [];

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.chargerGenres();
  }

  chargerGenres(): void {
    this.genreService.getAll().subscribe({
      next: (data) => {
        console.log('Données reçues :', data);
        console.log('Nombre de genres :', data.length);

        this.genres = data;
        console.log('Genres chargés :', this.genres);
      },
      error: (err) => {
        console.error('Erreur de chargement :', err);
      }
    });
  }
}