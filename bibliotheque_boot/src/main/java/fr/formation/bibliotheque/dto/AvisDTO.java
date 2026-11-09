package fr.formation.bibliotheque.dto;

import java.time.LocalDate;

import org.springframework.beans.BeanUtils;

import fr.formation.bibliotheque.model.Avis;

public class AvisDTO {
    
    private Integer id;
    private double note;
    private String commentaire;
    private LocalDate date;
    // Importer Livre -> Tu l'avais pas donc ça se tient que tu l'ai pas importé
    private Livre livre;

    public static AvisDTO convert(Avis avis){
        AvisDTO avisDTO = new AvisDTO();
        BeanUtils.copyProperties(avis, avisDTO);
        return avisDTO;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public double getNote() {
        return note;
    }

    public void setNote(double note) {
        this.note = note;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Livre getLivre() {
        return livre;
    }

    public void setLivre(Livre livre) {
        this.livre = livre;
    }

    
} 