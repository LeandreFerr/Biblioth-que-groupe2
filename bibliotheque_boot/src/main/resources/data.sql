-- ==========================================
-- JEU DE DONNÉES DE TEST (BIBLIOTHÈQUE)
-- ==========================================

-- 0. GENRES
INSERT IGNORE INTO `genre` (`id`, `libelle`) VALUES
(1, 'Science-Fiction'),
(2, 'Roman'),
(3, 'Classiques'),
(4, 'Poche'),
(5, 'Manga'),
(6, 'Policier'),
(7, 'Fantastique');

-- 1. EDITEURS
INSERT IGNORE INTO `editeur` (`id`, `nom`, `pays`) VALUES
(1, 'Gallimard', 'France'),
(2, 'Folio', 'France'),
(3, 'Penguin Books', 'Royaume-Uni'),
(4, 'J''ai Lu', 'France');

-- 2. COLLECTIONS (Optionnelles)
INSERT IGNORE INTO `collection` (`id`, `nom`) VALUES
(1, 'Science-Fiction'),
(2, 'Classiques'),
(3, 'Poche');

-- 3. AUTEURS
INSERT IGNORE INTO `auteur` (`id`, `nom`, `prenom`, `nationalite`) VALUES
(1, 'Orwell', 'George', 'Britannique'),
(2, 'Herbert', 'Frank', 'Américain'),
(3, 'Hugo', 'Victor', 'Français'),
(4, 'Asimov', 'Isaac', 'Américain');

-- 4. LIVRES
-- Note : les colonnes de liaisons sont 'auteur', 'editeur', 'collection' et 'genre' (FK)
INSERT IGNORE INTO `livre` (`id`, `titre`, `resume`, `annee`, `auteur`, `editeur`, `collection`, `genre`) VALUES
(1, '1984', 'Dans un monde totalitaire surveillé par Big Brother, Winston Smith tente de résister secrètement au Parti.', 1949, 1, 1, 2, 1),
(2, 'Dune', 'Sur la planète désertique Arrakis, le jeune Paul Atréides doit affronter de sombres complots politiques pour contrôler l''Épice.', 1965, 2, 4, 1, 1),
(3, 'Les Misérables', 'Le parcours et la rédemption de l''ancien forçat Jean Valjean dans la France tourmentée du XIXe siècle.', 1862, 3, 2, 2, 2),
(4, 'Fondation', 'Le savant Hari Seldon invente la psychohistoire et tente de sauver le savoir de l''humanité face à la chute imminente de l''Empire galactique.', 1951, 4, 3, 1, 1),
(5, 'La Ferme des animaux', 'Une fable politique et satirique où les animaux d''une ferme se révoltent contre leur maître humain.', 1945, 1, 1, NULL, 2);

-- 5. UTILISATEUR DE TEST (Login: test / Mot de passe: test)
INSERT INTO `utilisateur` (`id`, `username`, `password`) VALUES
(1, 'test', '$2a$10$2Cz3Ew78RjSkMV4spc5Ul.YXFqnKrkrHZ6Ha1ftIVlRp82RR74Rty')
ON DUPLICATE KEY UPDATE `password` = VALUES(`password`);
