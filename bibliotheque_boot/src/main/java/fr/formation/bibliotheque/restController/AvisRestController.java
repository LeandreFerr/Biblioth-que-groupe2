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
import org.springframework.web.bind.annotation.RestController;

import fr.formation.bibliotheque.dao.IDAOAvis;
import fr.formation.bibliotheque.model.Avis;

@RestController 
@RequestMapping ("/api/avis")
@CrossOrigin("*")
public class AvisRestController {
    
    final IDAOAvis daoAvis;

    AvisRestController(IDAOAvis daoAvis) {
        this.daoAvis = daoAvis;
    }

    @GetMapping 
    public List<Avis> AfficherTous()
    {
        return daoAvis.findAll();
    }

    @GetMapping ("/{id}")
    public Avis afficherParId(@PathVariable Integer id)
    {
        return daoAvis.findById(id).orElse(null);
    }

    @DeleteMapping ("/{id}") 
    public void supprimer(@PathVariable Integer id)
    {
        daoAvis.deleteById(id);
    }

    @PostMapping
    public Avis ajouter(@RequestBody Avis avis)
    {
        daoAvis.save(avis);
        return avis;
    }

    @PutMapping ("/{id}")
    public Avis modifier (@PathVariable Integer id, @RequestBody Avis avis)
    {
        avis.setId(id);
        daoAvis.save(avis);
        return avis;
    }
}
