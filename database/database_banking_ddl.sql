drop database IF Exists bankingref;
create database bankingref;

CREATE TABLE usertype (
user_id serial PRIMARY KEY,
usertypename VARCHAR ( 100 ) NOT NULL
);

create table gender ( genderid serial PRIMARY KEY,
gendername VARCHAR ( 100 )	NOT NULL);


CREATE TABLE bank (
	bank_id serial PRIMARY KEY,
	bankname VARCHAR ( 100 ) ,
	ifsc VARCHAR ( 100 ) UNIQUE NOT NULL,
	email VARCHAR ( 255 ) ,
	address VARCHAR ( 100 ),
    state VARCHAR ( 100 ),
    country VARCHAR ( 100 ),
    pincode VARCHAR ( 100 )
);


CREATE TABLE accounttype (
acc_type_id serial PRIMARY KEY,
acc_type_name VARCHAR ( 100 ) NOT NULL
);

CREATE TABLE transactiontype(Tran_type_ID serial PRIMARY KEY,Transaction_type VARCHAR ( 100 ) NOT NULL );


CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 100 ) ,
	user_type_id integer,
	gender_id integer  ,
	dob Date,
    address VARCHAR ( 255 ),
    state VARCHAR(100),
    country VARCHAR ( 100 ),
    pincode VARCHAR ( 100 ),
    email VARCHAR(100),
    passwd VARCHAR ( 255 )
);

ALTER TABLE users
    ADD CONSTRAINT fk_user_type FOREIGN KEY (user_type_id) REFERENCES usertype (user_id);

ALTER TABLE users
    ADD CONSTRAINT fk_gender_id FOREIGN KEY (gender_id) REFERENCES gender (genderid);


CREATE TABLE accounts (
	acc_id serial PRIMARY KEY,
	user_id integer ,
	bank_id integer,
	cif VARCHAR(100)  ,
	acc_type_id integer,
    balance double precision
);

ALTER TABLE accounts
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE accounts
    ADD CONSTRAINT fk_bank_id FOREIGN KEY (bank_id) REFERENCES bank (bank_id);

ALTER TABLE accounts
    ADD CONSTRAINT fk_acc_type_id FOREIGN KEY (acc_type_id) REFERENCES accounttype (acc_type_id);



CREATE TABLE status_type (
status_type_id serial PRIMARY KEY,
status_type_name VARCHAR ( 100 ) NOT NULL
);


CREATE TABLE transactions (
	transaction_id serial PRIMARY KEY,
	Tran_type_ID integer ,
	transaction_amount double precision,
	tran_date Date,
    status_type_id integer,
    from_acc_id integer,
    to_acc_id integer
);
create table user_pwd(usr_id int , passwd VARCHAR(500));
ALTER TABLE user_pwd 
    ADD CONSTRAINT fk_user_pwd FOREIGN KEY (usr_id) REFERENCES users (user_id);

ALTER TABLE transactions
    ADD CONSTRAINT fk_tran_type FOREIGN KEY (Tran_type_ID) REFERENCES transactiontype (Tran_type_ID);

ALTER TABLE transactions
    ADD CONSTRAINT fk_status_id FOREIGN KEY (status_type_id) REFERENCES status_type (status_type_id);

ALTER TABLE transactions
    ADD CONSTRAINT fk_from_acc_id FOREIGN KEY (from_acc_id) REFERENCES accounts (acc_id);

ALTER TABLE transactions
    ADD CONSTRAINT fk_to_acc_id FOREIGN KEY (to_acc_id) REFERENCES accounts (acc_id);
