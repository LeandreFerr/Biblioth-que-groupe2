package fr.formation.bibliotheque.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.formation.bibliotheque.model.Genre;
import fr.formation.bibliotheque.model.Livre;

public interface IDAOLivre extends JpaRepository<Livre, Integer> {

    // Recherche par titre (LIKE %titre% insensible à la casse)
    List<Livre> findByTitreContainingIgnoreCase(String titre);

    // Recherche par année
    List<Livre> findByAnnee(Integer annee);

    // Recherche par Auteur (via son ID)
    List<Livre> findByAuteurId(Integer auteurId);

    // Recherche par Editeur (via son ID)
    List<Livre> findByEditeurId(Integer editeurId);

    // Recherche par Collection (via son ID)
    List<Livre> findByCollectionId(Integer collectionId);

    // Recherche par Genre (Enum)
    List<Livre> findByGenre(Genre genre);

    List<Livre> findByGenreId(Integer genreId);

}
