-- Creating DB
CREATE DATABASE organs_db;

--drop tables if exist
drop table if exists national;
drop table if exists state;
drop table if exists demographics;

--Creating Table schemas 
CREATE TABLE national(
    year INTEGER PRIMARY KEY,
    organ VARCHAR PRIMARY KEY,
    number_of_deceased_organ_donors_recovered INTEGER,
    number_of_living_organ_donors_recovered INTEGER
    number_of_deceased_donor_organ_transplant_recipients INTEGER
    number_of_living_donor_organ_transplant_recipients INTEGER
);


CREATE TABLE state( 
    type VARCHAR,
    year INTEGER PRIMARY KEY,
    state_name VARCHAR PRIMARY KEY,
    state_code VARCHAR,
    organ VARCHAR PRIMARY KEY,
    counts INTEGER
);


CREATE TABLE demographics(
    transplant_year INTEGER PRIMARY KEY,
    donor_type VARCHAR PRIMARY KEY,
    organ_transplantd VARCHAR PRIMARY KEY,
    total INTEGER,
    male INTEGER, 
    female INTEGER,
    no_age_reported INTEGER, 
    pediatric INTEGER,
    age_18_30 INTEGER,
    age_31_40 INTEGER,
    age_41_50 INTEGER,
    age_51_60 INTEGER,
    age_61_plus INTEGER,
    white INTEGER, 
    black INTEGER,
    hispanic INTEGER,
    asian INTEGER,
    american_indian INTEGER,
    native_hawaiian INTEGER,
    multiracial INTEGER
);

--Checking if data improted correctly 
SELECT * FROM national; 
SELECT * FROM state; 
SELECT * FROM demographics;
