CREATE DATABASE projectalarms;
\c projectalarms;
CREATE TABLE usuarios ( id SERIAL, email VARCHAR(50) NOT NULL, password
VARCHAR(60) NOT NULL, type VARCHAR(25) NOT NULL, name VARCHAR(25) NOT NULL );
