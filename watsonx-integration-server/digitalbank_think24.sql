--
-- PostgreSQL database dump
--

-- Dumped from database version 13.14
-- Dumped by pg_dump version 13.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    acc_id integer NOT NULL,
    user_id integer,
    bank_id integer,
    cif character varying(100),
    acc_type_id integer,
    balance double precision
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: accounts_acc_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_acc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_acc_id_seq OWNER TO postgres;

--
-- Name: accounts_acc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_acc_id_seq OWNED BY public.accounts.acc_id;


--
-- Name: accounttype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounttype (
    acc_type_id integer NOT NULL,
    acc_type_name character varying(100) NOT NULL
);


ALTER TABLE public.accounttype OWNER TO postgres;

--
-- Name: accounttype_acc_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounttype_acc_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounttype_acc_type_id_seq OWNER TO postgres;

--
-- Name: accounttype_acc_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounttype_acc_type_id_seq OWNED BY public.accounttype.acc_type_id;


--
-- Name: bank; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bank (
    bank_id integer NOT NULL,
    bankname character varying(100),
    ifsc character varying(100) NOT NULL,
    email character varying(255),
    address character varying(100),
    state character varying(100),
    country character varying(100),
    pincode character varying(100)
);


ALTER TABLE public.bank OWNER TO postgres;

--
-- Name: bank_bank_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bank_bank_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bank_bank_id_seq OWNER TO postgres;

--
-- Name: bank_bank_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bank_bank_id_seq OWNED BY public.bank.bank_id;


--
-- Name: gender; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gender (
    genderid integer NOT NULL,
    gendername character varying(100) NOT NULL
);


ALTER TABLE public.gender OWNER TO postgres;

--
-- Name: gender_genderid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gender_genderid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gender_genderid_seq OWNER TO postgres;

--
-- Name: gender_genderid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gender_genderid_seq OWNED BY public.gender.genderid;


--
-- Name: status_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status_type (
    status_type_id integer NOT NULL,
    status_type_name character varying(100) NOT NULL
);


ALTER TABLE public.status_type OWNER TO postgres;

--
-- Name: status_type_status_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_type_status_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.status_type_status_type_id_seq OWNER TO postgres;

--
-- Name: status_type_status_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_type_status_type_id_seq OWNED BY public.status_type.status_type_id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    transaction_id integer NOT NULL,
    tran_type_id integer,
    transaction_amount double precision,
    tran_date timestamp without time zone,
    status_type_id integer,
    from_acc_id integer,
    to_acc_id integer,
    fraud_score integer,
    fraud_category integer
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_transaction_id_seq OWNER TO postgres;

--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_transaction_id_seq OWNED BY public.transactions.transaction_id;


--
-- Name: transactiontype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactiontype (
    tran_type_id integer NOT NULL,
    transaction_type character varying(100) NOT NULL
);


ALTER TABLE public.transactiontype OWNER TO postgres;

--
-- Name: transactiontype_tran_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactiontype_tran_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactiontype_tran_type_id_seq OWNER TO postgres;

--
-- Name: transactiontype_tran_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactiontype_tran_type_id_seq OWNED BY public.transactiontype.tran_type_id;


--
-- Name: user_pwd; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_pwd (
    usr_id integer,
    passwd character varying(500)
);


ALTER TABLE public.user_pwd OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(100),
    user_type_id integer,
    gender_id integer,
    dob timestamp without time zone,
    address character varying(255),
    state character varying(100),
    country character varying(100),
    pincode character varying(100),
    email character varying(100),
    passwd character varying(255),
    first_name character varying(100),
    last_name character varying(100)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: usertype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usertype (
    user_id integer NOT NULL,
    usertypename character varying(100) NOT NULL
);


ALTER TABLE public.usertype OWNER TO postgres;

--
-- Name: usertype_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usertype_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usertype_user_id_seq OWNER TO postgres;

--
-- Name: usertype_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usertype_user_id_seq OWNED BY public.usertype.user_id;


--
-- Name: accounts acc_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN acc_id SET DEFAULT nextval('public.accounts_acc_id_seq'::regclass);


--
-- Name: accounttype acc_type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounttype ALTER COLUMN acc_type_id SET DEFAULT nextval('public.accounttype_acc_type_id_seq'::regclass);


--
-- Name: bank bank_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank ALTER COLUMN bank_id SET DEFAULT nextval('public.bank_bank_id_seq'::regclass);


--
-- Name: gender genderid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gender ALTER COLUMN genderid SET DEFAULT nextval('public.gender_genderid_seq'::regclass);


--
-- Name: status_type status_type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status_type ALTER COLUMN status_type_id SET DEFAULT nextval('public.status_type_status_type_id_seq'::regclass);


--
-- Name: transactions transaction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public.transactions_transaction_id_seq'::regclass);


--
-- Name: transactiontype tran_type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactiontype ALTER COLUMN tran_type_id SET DEFAULT nextval('public.transactiontype_tran_type_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: usertype user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usertype ALTER COLUMN user_id SET DEFAULT nextval('public.usertype_user_id_seq'::regclass);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (acc_id, user_id, bank_id, cif, acc_type_id, balance) FROM stdin;
2005787	1	1	1578	1	10000
2005791	3	1	1578	1	50000
2005794	4	1	1578	1	50500
2005795	5	1	1578	1	60500
2005790	2	1	1578	1	20000
2005788	6	1	1578	1	100
2005789	7	1	1578	1	100900
\.


--
-- Data for Name: accounttype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounttype (acc_type_id, acc_type_name) FROM stdin;
1	SAVINGS
2	CURRENT
\.


--
-- Data for Name: bank; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bank (bank_id, bankname, ifsc, email, address, state, country, pincode) FROM stdin;
1	FUTUREBANK	FUTU00001	futurebank@future.com	EGL	karnataka	India	570089
\.


--
-- Data for Name: gender; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gender (genderid, gendername) FROM stdin;
1	FEMALE
2	MALE
3	OTHERS
\.


--
-- Data for Name: status_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status_type (status_type_id, status_type_name) FROM stdin;
1	SUCCESS
2	FAILED
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (transaction_id, tran_type_id, transaction_amount, tran_date, status_type_id, from_acc_id, to_acc_id, fraud_score, fraud_category) FROM stdin;
110424001	1	125	2024-04-11 14:00:59.00447	1	2005787	2005790	0	1
110424002	1	1000125	2024-04-11 14:05:04.754175	1	2005788	2005791	1	2
110424003	1	1000005	2024-04-11 14:51:45.510074	1	2005789	2005791	1	3
\.


--
-- Data for Name: transactiontype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactiontype (tran_type_id, transaction_type) FROM stdin;
1	DEBIT
2	CREDIT
\.


--
-- Data for Name: user_pwd; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_pwd (usr_id, passwd) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, user_type_id, gender_id, dob, address, state, country, pincode, email, passwd, first_name, last_name) FROM stdin;
1	mithun	1	2	1987-11-12 00:00:00	No30,4th Main,5th cross,Bogadi	Karnataka	India	570026	mithun.hallikere@gmail.com	1246744352	Mithun	Hallikere
2	saniya	1	1	\N	1,Janpath	New Delhi	India	110001	sania.bank@gmail.com	12345678	Saniya	Mirja
3	rahul	1	2	\N	22, Andheri west	Maharashtra	India	400053	rahul.kulkarni@gmail.com	14445678	Rahul	Sippi
4	Daniel	1	2	\N	Lincoln oaks Burnet road	Texas	USA	78727	daniel.bank@gmail.com	1234321	Daniel	Isaac
5	Stephanie	1	1	\N	Latin Quarter	Paris	France	75001	stephanie.bank@gmail.com	1234345	Stephanie	Jane
6	Kate	1	2	\N	40, Andheri west	Maharashtra	India	400053	kate.bank@gmail.com	14445777	Kate	William
7	Trojan	1	2	\N	40, Andheri west	Maharashtra	India	400053	trojan.bank@gmail.com	14445888	Trojan	Warner
\.


--
-- Data for Name: usertype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usertype (user_id, usertypename) FROM stdin;
1	EMPLOYEE
2	CUSTOMER
\.


--
-- Name: accounts_acc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_acc_id_seq', 1, false);


--
-- Name: accounttype_acc_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounttype_acc_type_id_seq', 1, false);


--
-- Name: bank_bank_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bank_bank_id_seq', 1, false);


--
-- Name: gender_genderid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gender_genderid_seq', 1, false);


--
-- Name: status_type_status_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_type_status_type_id_seq', 1, false);


--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_transaction_id_seq', 1, false);


--
-- Name: transactiontype_tran_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactiontype_tran_type_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: usertype_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usertype_user_id_seq', 1, false);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (acc_id);


--
-- Name: accounttype accounttype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounttype
    ADD CONSTRAINT accounttype_pkey PRIMARY KEY (acc_type_id);


--
-- Name: bank bank_ifsc_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank
    ADD CONSTRAINT bank_ifsc_key UNIQUE (ifsc);


--
-- Name: bank bank_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank
    ADD CONSTRAINT bank_pkey PRIMARY KEY (bank_id);


--
-- Name: gender gender_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gender
    ADD CONSTRAINT gender_pkey PRIMARY KEY (genderid);


--
-- Name: status_type status_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status_type
    ADD CONSTRAINT status_type_pkey PRIMARY KEY (status_type_id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id);


--
-- Name: transactiontype transactiontype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactiontype
    ADD CONSTRAINT transactiontype_pkey PRIMARY KEY (tran_type_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: usertype usertype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usertype
    ADD CONSTRAINT usertype_pkey PRIMARY KEY (user_id);


--
-- Name: accounts fk_acc_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT fk_acc_type_id FOREIGN KEY (acc_type_id) REFERENCES public.accounttype(acc_type_id);


--
-- Name: accounts fk_bank_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT fk_bank_id FOREIGN KEY (bank_id) REFERENCES public.bank(bank_id);


--
-- Name: transactions fk_from_acc_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_from_acc_id FOREIGN KEY (from_acc_id) REFERENCES public.accounts(acc_id);


--
-- Name: users fk_gender_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_gender_id FOREIGN KEY (gender_id) REFERENCES public.gender(genderid);


--
-- Name: transactions fk_status_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_status_id FOREIGN KEY (status_type_id) REFERENCES public.status_type(status_type_id);


--
-- Name: transactions fk_to_acc_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_to_acc_id FOREIGN KEY (to_acc_id) REFERENCES public.accounts(acc_id);


--
-- Name: transactions fk_tran_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_tran_type FOREIGN KEY (tran_type_id) REFERENCES public.transactiontype(tran_type_id);


--
-- Name: accounts fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: user_pwd fk_user_pwd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_pwd
    ADD CONSTRAINT fk_user_pwd FOREIGN KEY (usr_id) REFERENCES public.users(user_id);


--
-- Name: users fk_user_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_user_type FOREIGN KEY (user_type_id) REFERENCES public.usertype(user_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO root;


--
-- PostgreSQL database dump complete
--

