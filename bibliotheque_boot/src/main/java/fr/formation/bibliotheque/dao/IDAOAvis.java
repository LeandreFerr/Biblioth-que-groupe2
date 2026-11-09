package fr.formation.bibliotheque.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.formation.bibliotheque.model.Avis;

public interface IDAOAvis extends JpaRepository<Avis, Integer>{
    
}
