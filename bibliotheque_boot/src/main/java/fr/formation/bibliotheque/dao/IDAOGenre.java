
package fr.biblio.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import fr.biblio.model.Genre;

public interface IDAOGenre extends JpaRepository<Genre, Integer> {

}
