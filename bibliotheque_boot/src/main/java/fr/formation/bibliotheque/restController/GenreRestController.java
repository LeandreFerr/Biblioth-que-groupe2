package fr.formation.bibliotheque.restController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.formation.bibliotheque.model.Genre;

@RestController
@RequestMapping("/api/genre")
public class GenreRestController {

    @GetMapping
    public Genre[] getAll() {
        return Genre.values();
    }
}


/*
@RestController
@RequestMapping("/api/genre")
public class GenreRestController {

    private final IDAOGenre dao;

    public GenreRestController(IDAOGenre dao) {
        this.dao = dao;
    }

    @GetMapping
    public List<Genre> afficherTous() {
        return dao.findAll();
    }

    @GetMapping("/{id}")
    public Genre afficherParId(@PathVariable Integer id) {
        return dao.findById(id).orElse(null);
    }

    @PostMapping
    public Genre ajouter(@RequestBody Genre genre) {
        return dao.save(genre);
    }

    @PutMapping("/{id}")
    public Genre modifier(@PathVariable Integer id, @RequestBody Genre genre) {
        genre.setId(id);
        return dao.save(genre);
    }

    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Integer id) {
        dao.deleteById(id);
    }
}

*/
