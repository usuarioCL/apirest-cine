CREATE DATABASE cine;

USE cine;

CREATE TABLE peliculas
(
  id INT          AUTO_INCREMENT PRIMARY KEY,
  titulo          VARCHAR(100) NOT NULL,
  duracionmin     SMALLINT NOT NULL,
  clasificacion   ENUM('APT','+14','+18') NOT NULL DEFAULT 'APT',
  alanzamiento    CHAR(4) NOT NULL
)ENGINE=InnoDB;

INSERT INTO peliculas (titulo, duracionmin, clasificacion, alanzamiento) VALUES
('El Padrino', 175, 'APT', '1972'),
('El Padrino II', 202, '+14', '1974'),
('El Padrino III', 162, '+18', '1990'),
('La lista de Schindler', 195, '+18', '1993'),
('El Señor de los Anillos: La Comunidad del Anillo', 178, '+14', '2001'),
('El Señor de los Anillos: Las Dos Torres', 179, '+14', '2002'),
('El Señor de los Anillos: El Retorno del Rey', 201, '+14', '2003'),
('Pulp Fiction', 154, '+18', '1994'),
('Forrest Gump', 142, 'APT', '1994'),
('La vida es bella', 116, 'APT', '1997');

SELECT * FROM peliculas;