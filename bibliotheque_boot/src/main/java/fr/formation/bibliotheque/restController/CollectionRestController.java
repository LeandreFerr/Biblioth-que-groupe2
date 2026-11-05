package fr.formation.bibliotheque.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.formation.bibliotheque.dao.IDAOCollection;
import fr.formation.bibliotheque.model.Collection;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/collection")
public class CollectionRestController {

    @Autowired
    IDAOCollection daoCollection;

    @GetMapping
    public List<Collection> afficherTous() {
        return daoCollection.findAll();
    }

    @GetMapping("/{id}")
    public Collection afficherParId(@PathVariable Integer id) {
        return daoCollection.findById(id).orElse(null);
    }

    // @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Integer id) {
        daoCollection.deleteById(id);
    }

    // @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Collection ajouter(@RequestBody Collection collection) {
        daoCollection.save(collection);
        return collection;
    }

    // @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Collection modifier(@PathVariable Integer id, @RequestBody Collection collection) {
        collection.setId(id);
        daoCollection.save(collection);
        return collection;
    }

    @GetMapping("/search")
    public List<Collection> rechercherParNom(@RequestParam String recherche) {
        return daoCollection.findByNomContaining(recherche);
    }
}