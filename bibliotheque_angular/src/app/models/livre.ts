import { Auteur } from './auteur';
import { Editeur } from './editeur';
import { Collection } from './collection';
import { Genre } from './genre';

export interface Livre {
  id?: number;
  titre: string;
  resume: string;
  annee: number;
  auteur: Auteur;
  editeur: Editeur;
  collection?: Collection | null;
  genre: Genre | null;

}
