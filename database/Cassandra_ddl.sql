
CREATE KEYSPACE IF NOT EXISTS bankingref
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };
  
  
CREATE TABLE usertype (
user_id int PRIMARY KEY,
usertypename text
);

create table gender ( genderid int PRIMARY KEY,
gendername text);


CREATE TABLE bank (
	bank_id int PRIMARY KEY,
	bankname text ,
	ifsc text ,
	email text ,
	address text,
    state text,
    country text,
    pincode text
);


CREATE TABLE accounttype (
acc_type_id int PRIMARY KEY,
acc_type_name text 
);

CREATE TABLE transactiontype(Tran_type_ID int PRIMARY KEY,Transaction_type text  );

CREATE TABLE users (
	user_id int PRIMARY KEY,
	username text ,
	user_type_id int,
	gender_id int  ,
	dob Date,
    address text,
    state text,
    country text,
    pincode text,
    email text,
    passwd text
);

CREATE TABLE accounts (
	acc_id int PRIMARY KEY,
	user_id int ,
	bank_id int,
	cif text  ,
	acc_type_id int,
    balance double
);


CREATE TABLE status_type (
status_type_id int PRIMARY KEY,
status_type_name text 
);


CREATE TABLE transactions (
	transaction_id int PRIMARY KEY,
	Tran_type_ID int ,
	transaction_amount double,
	tran_date Date,
    status_type_id int,
    from_acc_id int,
    to_acc_id int
);



