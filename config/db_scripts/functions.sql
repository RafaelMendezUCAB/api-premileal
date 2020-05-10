CREATE PROCEDURAL LANGUAGE plpgsql;

/* --------------- GENERATE USER FIRST STATUS ------------------ */
CREATE OR REPLACE FUNCTION GENERATE_USER_FIRST_STATUS()
    RETURNS TRIGGER AS
    $BODY$
    BEGIN
        INSERT INTO HST_STA(hs_date, fk_user_id, fk_status_id) VALUES(now(), NEW.ID, 5);
        RETURN NEW;
    END;
    $BODY$
LANGUAGE plpgsql;

/* --------------- ASSIGN LEVEL ------------------ */
CREATE OR REPLACE FUNCTION ASSIGN_LEVEL()
	RETURNS TRIGGER AS
	$BODY$
	BEGIN 
		UPDATE USER_F
		SET l_u_id = 1
		WHERE u_id = NEW.u_id;

		RETURN NEW;
	END;
	$BODY$
LANGUAGE plpgsql;