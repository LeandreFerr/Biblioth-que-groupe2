package fr.formation.bibliotheque.restController;

import fr.formation.bibliotheque.model.Genre;
import fr.formation.bibliotheque.dao.IDAOGenre;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/genre")
@CrossOrigin(origins = "http://localhost:4200")
public class GenreRestController {

    private final IDAOGenre dao;

    public GenreRestController(IDAOGenre dao) {
        this.dao = dao;
    }

    // READ : récupérer tous les genres
    @GetMapping
    public List<Genre> afficherTous() {
        return dao.findAll();
    }

    // READ : récupérer un genre par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Genre> afficherParId(@PathVariable Integer id) {
        return dao.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE : ajouter un genre
    @PostMapping
    public Genre ajouter(@RequestBody Genre genre) {
        genre.setId(null);
        return dao.save(genre);
    }

    // UPDATE : modifier un genre
    @PutMapping("/{id}")
    public ResponseEntity<Genre> modifier(
            @PathVariable Integer id,
            @RequestBody Genre genre) {

        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        genre.setId(id);
        return ResponseEntity.ok(dao.save(genre));
    }

    // DELETE : supprimer un genre
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimer(@PathVariable Integer id) {

        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        dao.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}