package fr.formation.bibliotheque;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import fr.formation.bibliotheque.dao.IDAOUtilisateur;
import fr.formation.bibliotheque.model.Utilisateur;

@SpringBootTest
class PasswordTest {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IDAOUtilisateur dao;

    @Test
    void testerUtilisateurEnBase() {

        Utilisateur utilisateur = dao.findByUsername("test")
                .orElseThrow();

        System.out.println("Username : " + utilisateur.getUsername());

        System.out.println("Longueur du hash : "
                + utilisateur.getPassword().length());

        System.out.println("Hash récupéré : "
                + utilisateur.getPassword());

        System.out.println("Mot de passe valide : "
                + passwordEncoder.matches(
                        "test",
                        utilisateur.getPassword()
                ));
    }
}