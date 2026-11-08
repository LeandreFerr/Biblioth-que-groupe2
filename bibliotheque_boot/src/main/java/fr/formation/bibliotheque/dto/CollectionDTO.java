package fr.formation.bibliotheque.dto;

public class CollectionDTO {

    private Integer id;
    private String nom;

    public CollectionDTO() {
    }

    public CollectionDTO(Integer id, String nom) {
        this.id = id;
        this.nom = nom;
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

    @Override
    public String toString() {
        return "CollectionDTO{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                '}';
    }
}