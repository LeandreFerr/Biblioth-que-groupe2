import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuteurService } from '../../services/auteur-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Auteur } from '../../models';
import { Title } from '@angular/platform-browser';

@Component({
  imports: [FormsModule],
  selector: 'app-auteur-page',
  styleUrl: './auteur-page.css',
  templateUrl: './auteur-page.html',
})
export class AuteurPage implements OnInit{

  protected auteurs= rxResource({
  stream: () => this.auteurService.findAll()
  });
  protected formAuteur!: Auteur;

  constructor(private title: Title, private auteurService: AuteurService) {
    this.resetFormAuteur();
  }

   ngOnInit(): void {
    this.title.setTitle("Liste des auteurs");
  }

  protected ajouterOuModifier() {
    this.auteurService.save(this.formAuteur).subscribe({
      next: () => {
        this.auteurs.reload();
        this.resetFormAuteur();
    },
      error: (err) => {
        console.error("Erreur lors de l'enregistrement", err);
      }
    });
  }

  protected editer(auteur: Auteur) {
    this.formAuteur = { ...auteur };
  }

  protected supprimer(auteur: Auteur) {
    this.auteurService.remove(auteur).subscribe(() => {
      this.auteurs.reload();
    });
  }

  protected annulerEdition() {
    this.resetFormAuteur();
  }

  private resetFormAuteur() {
    this.formAuteur = { prenom: "", nom:"", nationalite:"" };
  }
}

