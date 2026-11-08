export enum Genre {
  ROMAN = 'ROMAN',
  SCIENCE_FICTION = 'SCIENCE_FICTION',
  FANTASY = 'FANTASY',
  POLICIER = 'POLICIER',
  MANGA = 'MANGA',
  BANDE_DESSINEE = 'BANDE_DESSINEE',
  THEATRE = 'THEATRE',
  POESIE = 'POESIE',
  BIOGRAPHIE = 'BIOGRAPHIE',
  HISTOIRE = 'HISTOIRE',
  AUTRE = 'AUTRE'
}

export const GENRE_LABELS: Record<Genre, string> = {
  [Genre.ROMAN]: 'Roman',
  [Genre.SCIENCE_FICTION]: 'Science-Fiction',
  [Genre.FANTASY]: 'Fantasy',
  [Genre.POLICIER]: 'Policier',
  [Genre.MANGA]: 'Manga',
  [Genre.BANDE_DESSINEE]: 'Bande dessinée',
  [Genre.THEATRE]: 'Théâtre',
  [Genre.POESIE]: 'Poésie',
  [Genre.BIOGRAPHIE]: 'Biographie',
  [Genre.HISTOIRE]: 'Histoire',
  [Genre.AUTRE]: 'Autre',
};