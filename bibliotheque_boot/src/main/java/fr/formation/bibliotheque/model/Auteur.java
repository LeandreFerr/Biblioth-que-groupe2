package fr.formation.bibliotheque.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity 
@Table (name="auteur")
public class Auteur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @Column(length = 25,nullable = false)
	private String nom;

    @Column(length = 25,nullable = false)
	private String prenom;

    @Column(length = 25,nullable = false)
	private String nationalite;


    public Auteur(){}

    public Auteur(Integer id, String nom, String prenom, String nationalite) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.nationalite = nationalite;
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

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNationalite() {
        return nationalite;
    }

    public void setNationalite(String nationalite) {
        this.nationalite = nationalite;
    }


    @Override
    public String toString() {
        return "Auteur [id=" + id + ", nom=" + nom + ", prenom=" + prenom + ", nationalite=" + nationalite + "]";
    }
}
