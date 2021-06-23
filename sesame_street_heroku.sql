USE iiy3o3lbboq7fjh0 ;          

CREATE TABLE sesameStreet(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  species VARCHAR(255),
  performed_by VARCHAR(255),
  description VARCHAR(255)
);

INSERT INTO sesameStreet (name, species, performed_by, description) VALUES ('Big Bird', 'Bird', 'Caroll Spinney', 'An 8foot bird who premiered in 1969, he can roller skate, ice skate, dance and swim');

DELETE FROM sesameStreet WHERE name = "Alex";
SELECT * FROM sesameStreet;
