--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: nutrient_effectiveness; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.nutrient_effectiveness (
    id integer NOT NULL,
    nutrient_name character varying(100),
    linked_emotion character varying(50),
    effectiveness text
);


--
-- Name: nutrient_effectiveness_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.nutrient_effectiveness_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: nutrient_effectiveness_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.nutrient_effectiveness_id_seq OWNED BY public.nutrient_effectiveness.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    role character varying(10) NOT NULL,
    date_of_birth date NOT NULL
);


--
-- Name: user_food_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_food_log (
    id integer NOT NULL,
    user_id integer,
    mood character varying(50) NOT NULL,
    meal_time character varying(50),
    food_type character varying(50),
    recommended_food character varying(255),
    feedback_rating integer,
    created_at timestamp without time zone
);


--
-- Name: user_food_log_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_food_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_food_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_food_log_id_seq OWNED BY public.user_food_log.id;


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: nutrient_effectiveness id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nutrient_effectiveness ALTER COLUMN id SET DEFAULT nextval('public.nutrient_effectiveness_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: user_food_log id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_food_log ALTER COLUMN id SET DEFAULT nextval('public.user_food_log_id_seq'::regclass);


--
-- Data for Name: nutrient_effectiveness; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.nutrient_effectiveness (id, nutrient_name, linked_emotion, effectiveness) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" (id, name, email, password_hash, role, date_of_birth) FROM stdin;
1	Admin	admin@example.com	pbkdf2:sha256:1000000$PtcI36JDxGhkpMRc$9565d2bf7eb5415233be3280859d6b1ffafe319e49f410a17e8bc127a38080e9	admin	1990-01-01
2	User	user@example.com	pbkdf2:sha256:1000000$ANDJyU4V8gd89fre$e74de057d99198afb3a7f4346b4462ea5553c4069e2206c0e01e1266ab8ad64e	user	2000-01-01
\.


--
-- Data for Name: user_food_log; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_food_log (id, user_id, mood, meal_time, food_type, recommended_food, feedback_rating, created_at) FROM stdin;
1	2	happy	Lunch	Meat	Chorizo	4	2025-05-01 12:31:34.958354
2	2	happy	Lunch	Vegetables	Kanpyo	5	2025-05-03 00:05:28.388168
3	2	happy	Breakfast	Grains	Cream cracker	3	2025-05-03 00:05:51.679403
4	2	neutral	Snack	Dairy	Powdered milk	4	2025-05-03 00:06:38.590256
\.


--
-- Name: nutrient_effectiveness_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.nutrient_effectiveness_id_seq', 1, false);


--
-- Name: user_food_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_food_log_id_seq', 4, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_id_seq', 2, true);


--
-- Name: nutrient_effectiveness nutrient_effectiveness_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nutrient_effectiveness
    ADD CONSTRAINT nutrient_effectiveness_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user_food_log user_food_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_food_log
    ADD CONSTRAINT user_food_log_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_food_log user_food_log_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_food_log
    ADD CONSTRAINT user_food_log_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

