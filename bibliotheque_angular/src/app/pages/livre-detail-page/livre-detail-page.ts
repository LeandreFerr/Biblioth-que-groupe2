import { Component, inject, OnInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LivreService } from '../../services/livre-service';
import { AvisService } from '../../services/avis-service';
import { Avis, Livre } from '../../models';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-livre-detail-page',
  styleUrl: './livre-detail-page.css',
  templateUrl: './livre-detail-page.html',
})
export class LivreDetailPage implements OnInit {

  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private livreService = inject(LivreService);
  private avisService = inject(AvisService);

  protected livre = signal<Livre | null>(null);
  protected avis = signal<Avis[]>([]);
  protected loading = signal(true);
  protected noteMoyenne = signal<number | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    if (id) {
      this.chargerDonnees(id);
    }
  }

  private chargerDonnees(id: number): void {
    this.livreService.findById(id).subscribe({
      next: (livre) => {
        this.livre.set(livre);
        this.title.setTitle(`${livre.titre} - Détails`);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement du livre :', err);
        this.loading.set(false);
      },
    });

    this.avisService.findByLivreId(id).subscribe({
      next: (listeAvis) => {
        this.avis.set(listeAvis);
        if (listeAvis.length > 0) {
          const somme = listeAvis.reduce((acc, a) => acc + a.note, 0);
          this.noteMoyenne.set(Math.round((somme / listeAvis.length) * 10) / 10);
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des avis :', err);
      }
    });
  }

  protected getEtoiles(note: number): string {
    const pleine = Math.round(note);
    return '★'.repeat(Math.max(0, Math.min(5, pleine))) + '☆'.repeat(Math.max(0, 5 - pleine));
  }
}
