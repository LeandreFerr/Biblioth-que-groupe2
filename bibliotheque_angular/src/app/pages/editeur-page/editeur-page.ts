import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Editeur } from '../../models/editeur';
import { EditeurService } from '../../services/editeur-service';
import { Observable, startWith, Subject, switchMap } from 'rxjs';

@Component({
  imports: [ReactiveFormsModule, AsyncPipe],
  selector: 'app-editeur-page',
  styleUrl: './editeur-page.css',
  templateUrl: './editeur-page.html',
})
export class EditeurPage implements OnInit{

protected editeurs$!: Observable<Editeur[]>;
  private refresh$: Subject<void> = new Subject<void>(); // Permettra de garder la même référence à l'Observable et alimenter le flux dès qu'un changement sera réalisé

  protected editingEditeurId?: number;
  protected formEditeurGroup!: FormGroup;
  protected formEditeurNomCtrl!: FormControl
  protected formEditeurPaysCtrl!: FormControl

  constructor(
    private title: Title,
    private editeurService: EditeurService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Liste des éditeurs");
    this.formEditeurNomCtrl = this.formBuilder.control("", Validators.required);
    this.formEditeurPaysCtrl = this.formBuilder.control("", Validators.required);

    this.formEditeurGroup = this.formBuilder.group({
      nom: this.formEditeurNomCtrl, pays: this.formEditeurPaysCtrl
    });

    this.editeurs$ = this.refresh$.pipe(

      startWith(null),

      switchMap(() => {
        return this.editeurService.findAll();
      })
    );
  }

  protected ajouterOuModifier() {
    if (this.formEditeurGroup.invalid) {
      return;
    }

    const editeur: Editeur = {
      ...this.formEditeurGroup.getRawValue(),
      id: this.editingEditeurId
    };

    this.editeurService.save(editeur).subscribe(() => {
      this.refresh$.next();
    });

    this.formEditeurGroup.reset();
  }

  protected editer(editeur: Editeur) {
    this.editingEditeurId = editeur.id;
    this.formEditeurNomCtrl.setValue(editeur.nom);
    this.formEditeurPaysCtrl.setValue(editeur.pays);
  }

  protected supprimer(editeur: Editeur) {
    this.editeurService.remove(editeur).subscribe(() => {
      this.refresh$.next();
    });
  }

  protected annulerEdition() {
    this.editingEditeurId = undefined;
    this.formEditeurGroup.reset();
  }
}
