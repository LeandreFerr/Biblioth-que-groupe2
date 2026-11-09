import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Genre } from '../../model/genre';
import { GenreService } from '../../service/genre.service';

@Component({
  selector: 'app-genre-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genre-page.html'
})
export class GenreListPage implements OnInit {

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