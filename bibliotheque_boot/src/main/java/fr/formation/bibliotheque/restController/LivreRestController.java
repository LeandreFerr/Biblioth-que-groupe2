package fr.formation.bibliotheque.restController;

import java.util.List;

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

import fr.formation.bibliotheque.dao.IDAOLivre;
import fr.formation.bibliotheque.model.Genre;
import fr.formation.bibliotheque.model.Livre;

@RestController 
@RequestMapping("/api/livre")
@CrossOrigin("*")
public class LivreRestController {

    private final IDAOLivre daoLivre;

    public LivreRestController(IDAOLivre daoLivre) {
        this.daoLivre = daoLivre;
    }

    // ==========================================
    // CRUD DE BASE
    // ==========================================

    @GetMapping
    public List<Livre> afficherTous() {
        return daoLivre.findAll();
    }

    @GetMapping("/{id}")
    public Livre afficherParId(@PathVariable Integer id) {
        return daoLivre.findById(id).orElse(null);
    }

    @PostMapping
    public Livre ajouter(@RequestBody Livre livre) {
        return daoLivre.save(livre);
    }

    @PutMapping("/{id}")
    public Livre modifier(@PathVariable Integer id, @RequestBody Livre livre) {
        livre.setId(id);
        return daoLivre.save(livre);
    }

    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Integer id) {
        daoLivre.deleteById(id);
    }

    // ==========================================
    // RECHERCHES & FILTRES
    // ==========================================

    // Recherche par mot-clé dans le titre : /api/livre/search?titre=dune
    @GetMapping("/search")
    public List<Livre> rechercherParTitre(@RequestParam String titre) {
        return daoLivre.findByTitreContainingIgnoreCase(titre);
    }

    // Filtrer par année : /api/livre/annee/1984
    @GetMapping("/annee/{annee}")
    public List<Livre> rechercherParAnnee(@PathVariable int annee) {
        return daoLivre.findByAnnee(annee);
    }

    // Filtrer par Auteur (ID) : /api/livre/auteur/1
    @GetMapping("/auteur/{id}")
    public List<Livre> rechercherParAuteur(@PathVariable Integer id) {
        return daoLivre.findByAuteurId(id);
    }

    // Filtrer par Editeur (ID) : /api/livre/editeur/1
    @GetMapping("/editeur/{id}")
    public List<Livre> rechercherParEditeur(@PathVariable Integer id) {
        return daoLivre.findByEditeurId(id);
    }

    // Filtrer par Collection (ID) : /api/livre/collection/1
    @GetMapping("/collection/{id}")
    public List<Livre> rechercherParCollection(@PathVariable Integer id) {
        return daoLivre.findByCollectionId(id);
    }

    // Filtrer par Genre : /api/livre/genre/SCIENCE_FICTION
    @GetMapping("/genre/{genre}")
    public List<Livre> rechercherParGenre(@PathVariable Genre genre) {
        return daoLivre.findByGenre(genre);
    }

}
