package fr.formation.bibliotheque.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.formation.bibliotheque.model.Collection;

public interface IDAOCollection extends JpaRepository<Collection, Integer> {

    public List<Collection> findByNomContaining(String recherche);

    public List<Collection> findAllByOrderByNomDesc();
}