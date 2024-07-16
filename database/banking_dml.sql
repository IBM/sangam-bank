INSERT INTO public.accounttype(acc_type_id, acc_type_name) VALUES (1, 'SAVINGS');
INSERT INTO public.accounttype(acc_type_id, acc_type_name) VALUES (2, 'CURRENT');
INSERT INTO public.status_type(status_type_id, status_type_name)VALUES (1, 'SUCCESS');
INSERT INTO public.status_type(status_type_id, status_type_name)VALUES (2, 'FAILED');

INSERT INTO public.transactiontype(tran_type_id, transaction_type)VALUES (1, 'DEBIT');
INSERT INTO public.transactiontype(tran_type_id, transaction_type)VALUES (2, 'CREDIT');

INSERT INTO public.usertype(user_id, usertypename)VALUES (1, 'EMPLOYEE');

INSERT INTO public.usertype(user_id, usertypename)VALUES (2, 'CUSTOMER');
INSERT INTO public.gender(genderid, gendername)VALUES (1, 'FEMALE');
INSERT INTO public.gender(genderid, gendername)VALUES (2, 'MALE');
INSERT INTO public.gender(genderid, gendername)VALUES (3, 'OTHERS');

INSERT INTO public.users(username, user_type_id, gender_id, dob, address, state, country, pincode, email, passwd)VALUES ('mithun', 1, 2, '1987-11-12', 'No30,4th Main,5th cross,Bogadi', 'Karnataka', 'India', '570026','mithun.hallikere@gmail.com', '1246744352');

INSERT INTO public.bank(bank_id, bankname, ifsc, email, address, state, country, pincode)VALUES (1, 'FUTUREBANK', 'FUTU00001', 'futurebank@future.com', 'EGL','karnataka', 'India', '570089');