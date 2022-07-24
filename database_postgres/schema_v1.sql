-- Database: mande_db

-- DROP DATABASE mande_db;

CREATE DATABASE mande_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE template0;

\c mande_db

CREATE TABLE type_(
	type_id SERIAL PRIMARY KEY,
	dtype TEXT,
	breed TEXT,
	type_description TEXT
);

CREATE TABLE pet(
    pid SERIAL PRIMARY KEY,
    pet_name TEXT UNIQUE,
    age INT, 
    typeid INT,
    FOREIGN KEY (typeid) REFERENCES type_(type_id)
);

CREATE TABLE toy(
    tid SERIAL PRIMARY KEY, 
    toy_name TEXT UNIQUE,
    color TEXT,
    pet_id INT,
    FOREIGN KEY(pet_id) REFERENCES pet(pid)
);