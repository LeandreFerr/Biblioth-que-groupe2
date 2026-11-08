package fr.formation.bibliotheque.dto.response;

public record AuteurResponse(
    Integer id,
    String nom,
    String prenom,
    String nationalite
) {

}
