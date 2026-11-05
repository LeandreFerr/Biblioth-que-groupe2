package fr.formation.bibliotheque.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.formation.bibliotheque.dao.IDAOEditeur;
import fr.formation.bibliotheque.model.Editeur;

@RestController 
@RequestMapping("api/editeur")
@CrossOrigin("*") //j'ai mis crossorigin pour tester l'api 
public class EditeurRestController {

    @Autowired 
    IDAOEditeur daoEditeur;

    @GetMapping
	public List<Editeur> afficherTous()
	{
	  return daoEditeur.findAll();
	}

	@GetMapping("/{id}")
	public Editeur afficherParId(@PathVariable Integer id)
	{
		return daoEditeur.findById(id).orElse(null);
	}

	@DeleteMapping("/{id}")
	public void supprimer(@PathVariable Integer id)
	{
		daoEditeur.deleteById(id);
	}

	@PostMapping
	public Editeur ajouter(@RequestBody Editeur matiere)
	{
		daoEditeur.save(matiere);
		return matiere;
	}

	@PutMapping("/{id}")
	public Editeur modifier(@PathVariable Integer id,@RequestBody Editeur matiere)
	{
	  matiere.setId(id);
      daoEditeur.save(matiere);
      return matiere;
	}


}
