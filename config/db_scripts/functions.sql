CREATE PROCEDURAL LANGUAGE plpgsql;

/* --------------- GENERATE USER FIRST STATUS ------------------ */
CREATE OR REPLACE FUNCTION GENERATE_USER_FIRST_STATUS()
    RETURNS TRIGGER AS
    $BODY$
    BEGIN
        INSERT INTO HST_STA(hs_date, fk_user_id, fk_status_id) VALUES(now(), NEW.u_id, 10);
        RETURN NEW;
    END;
    $BODY$
LANGUAGE plpgsql;

/* --------------- BANK ACCOUNT UNVERIFIED ------------------ */
CREATE OR REPLACE FUNCTION GENERATE_BANK_ACCOUNT_FIRST_STATUS()
    RETURNS TRIGGER AS
    $BODY$
    BEGIN
        INSERT INTO HST_STA(hs_date, fk_bank_ccount_id, fk_status_id) VALUES(now(), NEW.ba_id, 1);
        RETURN NEW;
    END;
    $BODY$
LANGUAGE plpgsql;

/* --------------- PROCCESSING PAYMENT ------------------ */
CREATE OR REPLACE FUNCTION GENERATE_PAYMENT_FIRST_STATUS()
    RETURNS TRIGGER AS
    $BODY$
    BEGIN
        INSERT INTO HST_STA(hs_date, fk_payment_id, fk_status_id) VALUES(now(), NEW.pay_id, 7);
        RETURN NEW;
    END;
    $BODY$
LANGUAGE plpgsql;