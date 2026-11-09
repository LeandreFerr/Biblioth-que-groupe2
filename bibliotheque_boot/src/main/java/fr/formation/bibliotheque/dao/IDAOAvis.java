package fr.formation.bibliotheque.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.formation.bibliotheque.model.Avis;

public interface IDAOAvis extends JpaRepository<Avis, Integer>{
    List<Avis> findByLivreId(Integer livreId);
}
