package fr.formation.bibliotheque;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import fr.formation.bibliotheque.dao.IDAOUtilisateur;
import fr.formation.bibliotheque.model.Utilisateur;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class PasswordTest {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IDAOUtilisateur dao;

    @Test
    void testerEtCorrigerUtilisateurEnBase() {
        // Encoder le mot de passe "test"
        String motDePasseEncode = passwordEncoder.encode("test");

        // Récupérer ou créer l'utilisateur "test"
        Utilisateur utilisateur = dao.findByUsername("test")
                .orElseGet(() -> {
                    Utilisateur u = new Utilisateur();
                    u.setUsername("test");
                    return u;
                });

        utilisateur.setPassword(motDePasseEncode);
        dao.save(utilisateur);

        System.out.println("=== MISE À JOUR MOT DE PASSE EFFECTUÉE ===");
        System.out.println("Username : " + utilisateur.getUsername());
        System.out.println("Nouveau hash en base : " + utilisateur.getPassword());
        System.out.println("Vérification matches('test') : " + passwordEncoder.matches("test", utilisateur.getPassword()));

        assertTrue(passwordEncoder.matches("test", utilisateur.getPassword()), "Le mot de passe 'test' doit être valide");
    }
}
