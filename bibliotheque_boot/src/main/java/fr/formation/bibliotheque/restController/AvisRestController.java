package fr.formation.bibliotheque.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
// Il manque un @CrossOrigin pour que angular puisse faire des requetes
public class AvisRestController {
    
    @Autowired 
    IDAOAvis daoAvis;

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


    // Tu appelle une path variable (trouvable dans l'url) mais tu n'en mets pas donc ça ne sera jamais trouvé
    @DeleteMapping 
    public void supprimer(@PathVariable Integer id)
    {
        daoAvis.deleteById(id);
    }

    // Ici ton @PathVariable attends un Avis, tu lui donnes un id
    // Revoir peut être ton post mapping et lui passer un avis en @RequestBody
    @PostMapping ("/{id}")
    public Avis ajouter(@PathVariable Avis avis)
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
