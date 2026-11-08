package fr.formation.bibliotheque.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.formation.bibliotheque.model.Auteur;

public interface IDAOAuteur extends JpaRepository <Auteur,Integer>{

}
