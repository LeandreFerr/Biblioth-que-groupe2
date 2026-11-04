package fr.formation.bibliotheque.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.formation.bibliotheque.model.Editeur;

public interface IDAOEditeur extends JpaRepository<Editeur,Integer>{

}
