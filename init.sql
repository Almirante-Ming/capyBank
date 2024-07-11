CREATE DATABASE fakes;
CREATE TABLE public.fakenames (
    number integer NOT NULL,
    gender character varying(6) NOT NULL,
    nameset character varying(25) NOT NULL,
    title character varying(6) NOT NULL,
    givenname character varying(20) NOT NULL,
    middleinitial character varying(1) NOT NULL,
    surname character varying(23) NOT NULL,
    streetaddress character varying(100) NOT NULL,
    city character varying(100) NOT NULL,
    state character varying(22) NOT NULL,
    statefull character varying(100) NOT NULL,
    zipcode character varying(15) NOT NULL,
    country character varying(2) NOT NULL,
    countryfull character varying(100) NOT NULL,
    emailaddress character varying(100) NOT NULL,
    username character varying(25) NOT NULL,
    password character varying(25) NOT NULL,
    browseruseragent character varying(255) NOT NULL,
    telephonenumber character varying(25) NOT NULL,
    telephonecountrycode integer NOT NULL,
    maidenname character varying(20) NOT NULL,
    birthday character varying(10) NOT NULL,
    age integer NOT NULL,
    tropicalzodiac character varying(11) NOT NULL,
    cctype character varying(10) NOT NULL,
    ccnumber character varying(16) NOT NULL,
    cvv2 character varying(3) NOT NULL,
    ccexpires character varying(10) NOT NULL,
    nationalid character varying(20) NOT NULL,
    upstracking character varying(24) NOT NULL,
    westernunionmtcn character(10) NOT NULL,
    moneygrammtcn character(8) NOT NULL,
    color character varying(6) NOT NULL,
    occupation character varying(70) NOT NULL,
    company character varying(70) NOT NULL,
    vehicle character varying(255) NOT NULL,
    domain character varying(70) NOT NULL,
    bloodtype character varying(3) NOT NULL,
    pounds character varying(5) NOT NULL,
    kilograms character varying(5) NOT NULL,
    feetinches character varying(6) NOT NULL,
    centimeters character varying(3) NOT NULL,
    guid character varying(36) NOT NULL,
    latitude numeric(10,6) NOT NULL,
    longitude numeric(10,6) NOT NULL
);

COPY fakenames FROM
  'C:\fakenames.csv' csv header delimiter ';' quote '"';