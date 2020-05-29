CREATE PROCEDURAL LANGUAGE plpgsql;

/* --------------- GENERATE USER FIRST STATUS ------------------ */
CREATE OR REPLACE FUNCTION GENERATE_USER_FIRST_STATUS()
    RETURNS TRIGGER AS
    $BODY$
    BEGIN
        INSERT INTO HST_STA(hs_date, fk_user_id, fk_status_id) VALUES(now(), NEW.u_id, (SELECT sta_id FROM STATUS WHERE sta_name = 'new user'));
        RETURN NEW;
    END;
    $BODY$
LANGUAGE plpgsql;

/* --------------- BANK ACCOUNT UNVERIFIED ------------------ */
CREATE OR REPLACE FUNCTION GENERATE_BANK_ACCOUNT_FIRST_STATUS()
    RETURNS TRIGGER AS
    $BODY$
    BEGIN
        INSERT INTO HST_STA(hs_date, fk_bank_account_id, fk_status_id) VALUES(now(), NEW.ba_id, (SELECT sta_id FROM STATUS WHERE sta_name = 'unverified'));
        RETURN NEW;
    END;
    $BODY$
LANGUAGE plpgsql;

/* --------------- PROCCESSING PAYMENT ------------------ */
CREATE OR REPLACE FUNCTION GENERATE_PAYMENT_FIRST_STATUS()
    RETURNS TRIGGER AS
    $BODY$
    BEGIN
        INSERT INTO HST_STA(hs_date, fk_payment_id, fk_status_id) VALUES(now(), NEW.pay_id, (SELECT sta_id FROM STATUS WHERE sta_name = 'in process'));
        RETURN NEW;
    END;
    $BODY$
LANGUAGE plpgsql;