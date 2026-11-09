package fr.formation.bibliotheque.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.formation.bibliotheque.model.Utilisateur;

public interface IDAOUtilisateur
        extends JpaRepository<Utilisateur, Integer> {

    Optional<Utilisateur> findByUsername(String username);
}