/* Database */

CREATE DATABASE consorsio_fid_3

/* Tables  */ 

CREATE TABLE ROLE (
	r_id SERIAL PRIMARY KEY,
	r_name VARCHAR(50) NOT NULL,
	r_description VARCHAR(100) NOT NULL
);

CREATE TABLE INVOICE (
	i_id SERIAL PRIMARY KEY,
	i_units INTEGER NOT NULL,
	i_amount INTEGER NOT NULL,
	i_service_commission INTEGER NOT NULL,
	i_pasarela_commission INTEGER NOT NULL
);

CREATE TABLE OFFER (
	o_id SERIAL PRIMARY KEY,
	o_name VARCHAR(50) NOT NULL,
	o_valid_through DATE NOT NULL,
	o_percentage INTEGER NOT NULL
);

CREATE TABLE PRODUCT (
	pro_id SERIAL PRIMARY KEY,
	pro_name VARCHAR(50) NOT NULL,
	pro_code INTEGER NOT NULL
);

CREATE TABLE STATUS (
	sta_id SERIAL PRIMARY KEY,
	sta_name VARCHAR(50) NOT NULL,
	sta_description VARCHAR(100) NOT NULL	
);

CREATE TABLE SETTINGS (
	set_id SERIAL PRIMARY KEY,
	set_service_commission INTEGER NOT NULL,
	set_gateway_commission INTEGER NOT NULL,
	set_dolar_value INTEGER NOT NULL,
	set_gold_income INTEGER NOT NULL
);

CREATE TABLE LEVEL (
	l_id SERIAL PRIMARY KEY,
	l_name VARCHAR(50) NOT NULL,
	l_percentage INTEGER NOT NULL,
	l_bonus INTEGER,
	l_cost INTEGER NOT NULL
);

CREATE TABLE PLACE (
	p_id SERIAL PRIMARY KEY,
	p_name VARCHAR(50) NOT NULL,
	p_type VARCHAR(50) NOT NULL,
	fk_place INTEGER,
	CONSTRAINT fk_place_id FOREIGN KEY(fk_place) REFERENCES PLACE(p_id)
);

CREATE TABLE USER_F (
	u_id SERIAL PRIMARY KEY,
	u_name VARCHAR(50) NOT NULL,
	u_lastName VARCHAR(50) NOT NULL,
	u_password VARCHAR(50) NOT NULL,
	u_image BYTEA,
	u_email VARCHAR(50) NOT NULL,
	u_birthdate DATE NOT NULL,
	u_points INTEGER NOT NULL,
	r_u_id INTEGER,
	p_u_id INTEGER,
	l_u_id INTEGER,
	CONSTRAINT fk_u_r_id FOREIGN KEY(r_u_id) REFERENCES ROLE(r_id),
	CONSTRAINT fk_u_p_id FOREIGN KEY(p_u_id) REFERENCES PLACE(p_id),
	CONSTRAINT fk_u_l_id FOREIGN KEY(l_u_id) REFERENCES LEVEL(l_id)
);

CREATE TABLE BANK_ACCOUNT (
	ba_id SERIAL PRIMARY KEY,
	ba_account_type VARCHAR(50) NOT NULL,
	ba_routing_number INTEGER NOT NULL,
	ba_account_number VARCHAR(50) NOT NULL,
	ba_check_number VARCHAR(50) NOT NULL,
	ba_is_primary BOOLEAN NOT NULL,
	u_ba_id INTEGER,
	CONSTRAINT fk_ba_u_id FOREIGN KEY(u_ba_id) REFERENCES USER_F(u_id)
);

CREATE TABLE WITHDRAW (
	w_id SERIAL PRIMARY KEY,
	w_points INTEGER NOT NULL,
	w_dolars INTEGER NOT NULL,
	u_w_id INTEGER,
	ba_w_id INTEGER,
	CONSTRAINT fk_w_u_id FOREIGN KEY(u_w_id) REFERENCES USER_F(u_id),
	CONSTRAINT fk_w_ba_id FOREIGN KEY(ba_w_id) REFERENCES BANK_ACCOUNT(ba_id)		
);

CREATE TABLE VALIDATION (
	v_id SERIAL PRIMARY KEY,
	v_payment_1 INTEGER NOT NULL,
	v_payment_2 INTEGER NOT NULL,
	v_date DATE NOT NULL,
	u_v_id INTEGER,
	ba_v_id INTEGER,
	CONSTRAINT fk_v_u_id FOREIGN KEY(u_v_id) REFERENCES USER_F(u_id),
	CONSTRAINT fk_v_ba_id FOREIGN KEY(ba_v_id) REFERENCES BANK_ACCOUNT(ba_id)
);

CREATE TABLE PAYMENT (
	pay_id SERIAL PRIMARY KEY,
	pay_amount INTEGER NOT NULL,
	pay_res_cod INTEGER NOT NULL,
	pay_description VARCHAR(100),
	u_pay_id INTEGER,
	ba_pay_id INTEGER,
	i_pay_id INTEGER,
	CONSTRAINT fk_pay_u_id FOREIGN KEY(u_pay_id) REFERENCES USER_F(u_id),
	CONSTRAINT fk_pay_ba_id FOREIGN KEY(ba_pay_id) REFERENCES BANK_ACCOUNT(ba_id),
	CONSTRAINT fk_pay_i_id FOREIGN KEY(i_pay_id) REFERENCES INVOICE(i_id)
);

CREATE TABLE USER_OFFER (
	uo_id SERIAL UNIQUE,
	o_uo_id INTEGER NOT NULL,
	u_uo_id INTEGER NOT NULL,
	pro_uo_id INTEGER NOT NULL,
	CONSTRAINT fk_uo_o_id FOREIGN KEY(o_uo_id) REFERENCES OFFER(o_id),
	CONSTRAINT fk_uo_u_id FOREIGN KEY(u_uo_id) REFERENCES USER_F(u_id),
	CONSTRAINT fk_uo_pro_id FOREIGN KEY(pro_uo_id) REFERENCES PRODUCT(pro_id),
	CONSTRAINT pk_uo PRIMARY KEY(uo_id,o_uo_id,u_uo_id,pro_uo_id)
);

CREATE TABLE HST_STA (
	hs_id SERIAL PRIMARY KEY,
	hs_date DATE NOT NULL,
	uo_hs_id INTEGER,
	pay_hs_id INTEGER,
	u_hs_id INTEGER,
	ba_hs_id INTEGER,
	w_hs_id INTEGER,
	s_hs_id INTEGER,
	CONSTRAINT fk_hs_uo_id FOREIGN KEY(uo_hs_id) REFERENCES USER_OFFER(uo_id),
	CONSTRAINT fk_hs_pay_id FOREIGN KEY(pay_hs_id) REFERENCES PAYMENT(pay_id),
	CONSTRAINT fk_hs_u_id FOREIGN KEY(u_hs_id) REFERENCES USER_F(u_id),
	CONSTRAINT fk_hs_ba_id FOREIGN KEY(ba_hs_id) REFERENCES BANK_ACCOUNT(ba_id),
	CONSTRAINT fk_hs_w_id FOREIGN KEY(w_hs_id) REFERENCES WITHDRAW(w_id),
	CONSTRAINT fk_hs_s_id FOREIGN KEY(s_hs_id) REFERENCES STATUS(sta_id)
);