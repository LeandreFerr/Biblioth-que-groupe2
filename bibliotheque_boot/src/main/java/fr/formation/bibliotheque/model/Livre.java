package fr.formation.bibliotheque.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity 
@Table(name = "livre")
public class Livre {

    // ==========================================
    // ATTRIBUTS
    // ==========================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 30, nullable = false)
    private String titre;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String resume;

    @Column(nullable = false)
    private int annee;

    @ManyToOne 
    @JoinColumn(name = "auteur", nullable = false)
    private Auteur auteur;

    @ManyToOne 
    @JoinColumn(name = "editeur", nullable = false)
    private Editeur editeur;

    @ManyToOne 
    @JoinColumn(name = "collection", nullable = true)
    private Collection collection;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    // ==========================================
    // CONSTRUCTEURS
    // ==========================================

    public Livre() { }

    public Livre(Integer id, String titre, String resume, int annee, Auteur auteur, Editeur editeur,
            Collection collection, Genre genre) {
        this.id = id;
        this.titre = titre;
        this.resume = resume;
        this.annee = annee;
        this.auteur = auteur;
        this.editeur = editeur;
        this.collection = collection;
        this.genre = genre;
    }

    // ==========================================
    // GETTERS & SETTERS
    // ==========================================

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public int getAnnee() {
        return annee;
    }

    public void setAnnee(int annee) {
        this.annee = annee;
    }

    public Auteur getAuteur() {
        return auteur;
    }

    public void setAuteur(Auteur auteur) {
        this.auteur = auteur;
    }

    public Editeur getEditeur() {
        return editeur;
    }

    public void setEditeur(Editeur editeur) {
        this.editeur = editeur;
    }

    public Collection getCollection() {
        return collection;
    }

    public void setCollection(Collection collection) {
        this.collection = collection;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    // ==========================================
    // TO STRING
    // ==========================================

    @Override
    public String toString() {
        return "Livre [id=" + id + ", titre=" + titre + ", resume=" + resume + ", annee=" + annee + ", auteur=" + auteur
                + ", editeur=" + editeur + ", collection=" + collection + ", genre=" + genre + "]";
    }
}
