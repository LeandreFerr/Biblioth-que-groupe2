package fr.formation.bibliotheque.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import fr.formation.bibliotheque.dao.IDAOUtilisateur;
import fr.formation.bibliotheque.model.Utilisateur;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final IDAOUtilisateur dao;

    public CustomUserDetailsService(IDAOUtilisateur dao) {
        this.dao = dao;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        Utilisateur utilisateur = dao.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Utilisateur introuvable : " + username));

        return User.builder()
                .username(utilisateur.getUsername())
                .password(utilisateur.getPassword())
                .roles("USER")
                .build();
    }
}