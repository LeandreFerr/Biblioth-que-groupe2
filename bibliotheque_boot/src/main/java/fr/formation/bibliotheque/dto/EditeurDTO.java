package fr.formation.bibliotheque.dto;

import org.springframework.beans.BeanUtils;

import fr.formation.bibliotheque.model.Editeur;

//Pour l'instant la DTO ne sert a rien dans le restController ! 

public class EditeurDTO {

private Integer id;
private String nom;
private String pays;

public static EditeurDTO convert(Editeur editeur){

    EditeurDTO editeurDTO = new EditeurDTO();
    BeanUtils.copyProperties(editeur, editeurDTO);
    return editeurDTO;
}

public Integer getId() {
    return id;
}

public void setId(Integer id) {
    this.id = id;
}

public String getNom() {
    return nom;
}

public void setNom(String nom) {
    this.nom = nom;
}

public String getPays() {
    return pays;
}

public void setPays(String pays) {
    this.pays = pays;
}


}
