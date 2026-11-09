import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Avis } from '../../models/avis';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { AvisService } from '../../services/avis-service';
import { LivreService } from '../../services/livre-service';
import { Livre } from '../../models/livre';

@Component({
  imports: [ReactiveFormsModule, AsyncPipe, FormsModule],
  selector: 'app-avis-page',
  styleUrl: './avis-page.css',
  templateUrl: './avis-page.html',
})
export class AvisPage implements OnInit {

  protected avis$!: Observable<Avis[]>;
  private refresh$: Subject<void> = new Subject<void>();

  protected livreService = inject(LivreService);
  protected livres$: Observable<Livre[]> = this.livreService.findAll();

  protected editingAvisId?: number;
  protected formAvisGroup!: FormGroup;
  protected formAvisNoteCtrl!: FormControl;
  protected formAvisCommentaireCtrl!: FormControl;
  protected formAvisDateCtrl!: FormControl;
  protected formAvisLivreCtrl!: FormControl;

  constructor(
    private title: Title,
    private avisService: AvisService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Liste des avis");
    this.formAvisNoteCtrl = this.formBuilder.control("", Validators.required);
    this.formAvisCommentaireCtrl = this.formBuilder.control("", Validators.required);
    this.formAvisDateCtrl = this.formBuilder.control("", Validators.required);
    this.formAvisLivreCtrl = this.formBuilder.control("", Validators.required);

    this.formAvisGroup = this.formBuilder.group({
      note: this.formAvisNoteCtrl,
      commentaire: this.formAvisCommentaireCtrl,
      date: this.formAvisDateCtrl,
      livre: this.formBuilder.group({id: this.formAvisLivreCtrl})
    });

    this.avis$ = this.refresh$.pipe(

      startWith(null),

      switchMap(() => {
        return this.avisService.findAll();
      })
    );
  }

  protected ajouterOuModifier() {
    if (this.formAvisGroup.invalid) {
      return;
    }

    const avis: Avis = {
      ...this.formAvisGroup.getRawValue(),
      id: this.editingAvisId
    };
    
    console.log(avis);

    this.avisService.save(avis).subscribe(() => {
      this.refresh$.next();
    });

    this.formAvisGroup.reset();
  }

  protected editer(avis: Avis) {
    this.editingAvisId = avis.id;
    this.formAvisNoteCtrl.setValue(avis.note);
    this.formAvisCommentaireCtrl.setValue(avis.commentaire);
    this.formAvisDateCtrl.setValue(avis.date);
    this.formAvisLivreCtrl.setValue(avis.livre);
  }

  protected supprimer(avis: Avis) {
    this.avisService.remove(avis).subscribe(() => {
      this.refresh$.next();
    });
  }

  protected annulerEdition() {
    this.editingAvisId = undefined;
    this.formAvisGroup.reset();
  }
}
