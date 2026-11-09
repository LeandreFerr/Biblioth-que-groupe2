package fr.formation.bibliotheque.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.formation.bibliotheque.model.Genre;

public interface IDAOGenre extends JpaRepository<Genre, Integer> {
    
}