/* Database */
CREATE DATABASE PREMILEAL

/* Tables  */ 
CREATE TABLE ROLE (
	r_id SERIAL PRIMARY KEY,
	r_name VARCHAR(50) NOT NULL UNIQUE,
	r_description VARCHAR(100) NOT NULL
);

CREATE TABLE OFFER (
	o_id SERIAL PRIMARY KEY,
	o_name VARCHAR(50) NOT NULL UNIQUE,
	o_valid_through DATE NOT NULL,
	o_percentage INTEGER NOT NULL
);

CREATE TABLE PRODUCT (
	pro_id SERIAL PRIMARY KEY,
	pro_name VARCHAR(50) NOT NULL UNIQUE,
	pro_code INTEGER NOT NULL
);

CREATE TABLE STATUS (
	sta_id SERIAL PRIMARY KEY,
	sta_name VARCHAR(50) NOT NULL UNIQUE,
	sta_description VARCHAR(100) NOT NULL
);

CREATE TABLE SETTINGS (
	set_id SERIAL PRIMARY KEY,
	set_service_commission REAL NOT NULL,
	set_gateway_commission REAL NOT NULL,
	set_dolar_value INTEGER NOT NULL,
	set_gold_income REAL NOT NULL
);

CREATE TABLE LEVEL (
	l_id SERIAL PRIMARY KEY,
	l_name VARCHAR(50) NOT NULL UNIQUE,
	l_percentage INTEGER NOT NULL,
	l_bonus INTEGER default 0,
	l_cost REAL NOT NULL
);

CREATE TABLE PLACE (
	p_id SERIAL PRIMARY KEY,
	p_acronym VARCHAR(10) NOT NULL UNIQUE,
	p_name VARCHAR(50) NOT NULL UNIQUE,
	p_type VARCHAR(50) NOT NULL,
	fk_place_id INTEGER,
	CONSTRAINT fk_place_id FOREIGN KEY(fk_place_id) REFERENCES PLACE(p_id)
);

CREATE TABLE BANK (
	ba_id SERIAL PRIMARY KEY,
	ba_name VARCHAR(50) NOT NULL UNIQUE,
	fk_place_id INTEGER NOT NULL,
	CONSTRAINT fk_place_id FOREIGN KEY(fk_place_id) REFERENCES PLACE(p_id)
);

CREATE TABLE ROUTING_NUMBER(
	ro_id SERIAL PRIMARY KEY,
	ro_number VARCHAR(50) NOT NULL UNIQUE,
	fk_bank_id INTEGER NOT NULL,
	CONSTRAINT fk_bank_id FOREIGN KEY(fk_bank_id) REFERENCES BANK(ba_id)
);

CREATE TABLE USER_F (
	u_id SERIAL PRIMARY KEY,
	u_name VARCHAR(50) NOT NULL,
	u_lastName VARCHAR(50) NOT NULL,
	u_password VARCHAR(50) NOT NULL,
	u_image VARCHAR(150),
	u_email VARCHAR(50) NOT NULL UNIQUE,
	u_birthdate DATE,
	u_points INTEGER NOT NULL,
	u_type VARCHAR(20),
	u_blocked BOOLEAN NOT NULL,
	u_stripe_id VARCHAR(50) NOT NULL UNIQUE,
	u_stripe_connect_id VARCHAR(50) NOT NULL UNIQUE
	fk_role_id INTEGER NOT NULL,
	fk_place_id INTEGER,
	fk_level_id INTEGER NOT NULL,
	CONSTRAINT fk_role_id FOREIGN KEY(fk_role_id) REFERENCES ROLE(r_id),
	CONSTRAINT fk_place_id FOREIGN KEY(fk_place_id) REFERENCES PLACE(p_id),
	CONSTRAINT fk_level_id FOREIGN KEY(fk_level_id) REFERENCES LEVEL(l_id)
);

CREATE TABLE BANK_ACCOUNT (
	ba_id SERIAL PRIMARY KEY,
	ba_account_type VARCHAR(50) NOT NULL,
	ba_routing_number INTEGER NOT NULL,
	ba_account_number VARCHAR(50) NOT NULL UNIQUE,
	ba_check_number VARCHAR(50) NOT NULL,
	ba_is_primary BOOLEAN NOT NULL,
	ba_stripe_id VARCHAR(50) NOT NULL UNIQUE
	fk_user_id INTEGER NOT NULL,
	CONSTRAINT fk_user_id FOREIGN KEY(fk_user_id) REFERENCES USER_F(u_id)
);

CREATE TABLE WITHDRAW (
	w_id SERIAL PRIMARY KEY,
	w_points INTEGER NOT NULL,
	w_dolars REAL NOT NULL,
	fk_user_id INTEGER NOT NULL,
	fk_bank_account_id INTEGER NOT NULL,
	CONSTRAINT fk_user_id FOREIGN KEY(fk_user_id) REFERENCES USER_F(u_id),
	CONSTRAINT fk_bank_account_id FOREIGN KEY(fk_bank_account_id) REFERENCES BANK_ACCOUNT(ba_id)		
);

CREATE TABLE VALIDATION (
	v_id SERIAL PRIMARY KEY,
	v_payment_1 REAL NOT NULL,
	v_payment_2 REAL NOT NULL,
	v_date DATE NOT NULL,
	fk_user_id INTEGER NOT NULL,
	fk_bank_account_id INTEGER NOT NULL,
	CONSTRAINT fk_user_id FOREIGN KEY(fk_user_id) REFERENCES USER_F(u_id),
	CONSTRAINT fk_bank_account_id FOREIGN KEY(fk_bank_account_id) REFERENCES BANK_ACCOUNT(ba_id)
);

CREATE TABLE PAYMENT (
	pay_id SERIAL PRIMARY KEY,
	pay_amount REAL NOT NULL,
	pay_res_cod INTEGER NOT NULL,
	pay_description VARCHAR(100),
	fk_user_id INTEGER NOT NULL,
	fk_bank_account_id INTEGER NOT NULL,
	CONSTRAINT fk_user_id FOREIGN KEY(fk_user_id) REFERENCES USER_F(u_id),
	CONSTRAINT fk_bank_account_id FOREIGN KEY(fk_bank_account_id) REFERENCES BANK_ACCOUNT(ba_id)
);

CREATE TABLE INVOICE (
	i_id SERIAL PRIMARY KEY,
	i_units INTEGER NOT NULL,
	i_amount REAL NOT NULL,
	i_service_commission REAL NOT NULL,
	i_gateway_commission REAL NOT NULL,
	fk_payment_id INTEGER NOT NULL,
	CONSTRAINT fk_payment_id FOREIGN KEY(fk_payment_id) REFERENCES PAYMENT(pay_id)
);

CREATE TABLE USER_OFFER (
	uo_id SERIAL PRIMARY KEY UNIQUE,
	fk_offer_id INTEGER NOT NULL,
	fk_user_id INTEGER NOT NULL,
	fk_product_id INTEGER NOT NULL,
	CONSTRAINT fk_offer_id FOREIGN KEY(fk_offer_id) REFERENCES OFFER(o_id),
	CONSTRAINT fk_user_id FOREIGN KEY(fk_user_id) REFERENCES USER_F(u_id),
	CONSTRAINT fk_product_id FOREIGN KEY(fk_product_id) REFERENCES PRODUCT(pro_id)
);

CREATE TABLE HST_STA (
	hs_id SERIAL PRIMARY KEY,
	hs_date DATE NOT NULL,
	fk_user_offer_id INTEGER,
	fk_payment_id INTEGER,
	fk_user_id INTEGER,
	fk_bank_account_id INTEGER,
	fk_withdraw_id INTEGER,
	fk_status_id INTEGER,
	CONSTRAINT fk_user_offer_id FOREIGN KEY(fk_user_offer_id) REFERENCES USER_OFFER(uo_id),
	CONSTRAINT fk_payment_id FOREIGN KEY(fk_payment_id) REFERENCES PAYMENT(pay_id),
	CONSTRAINT fk_user_id FOREIGN KEY(fk_user_id) REFERENCES USER_F(u_id),
	CONSTRAINT fk_bank_account_id FOREIGN KEY(fk_bank_account_id) REFERENCES BANK_ACCOUNT(ba_id),
	CONSTRAINT fk_withdraw_id FOREIGN KEY(fk_withdraw_id) REFERENCES WITHDRAW(w_id),
	CONSTRAINT fk_status_id FOREIGN KEY(fk_status_id) REFERENCES STATUS(sta_id)
);