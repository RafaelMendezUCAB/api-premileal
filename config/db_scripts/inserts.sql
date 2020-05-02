/* Inserts de Role */

INSERT INTO ROLE(r_name,r_description)
	VALUES('cliente','Aliquam ornare lectus nunc, faucibus ultrices erat varius nec. Nam in lorem quis orci vestibulum convallis. Nunc nec efficitur nibh');
INSERT INTO ROLE(r_name,r_description)
	VALUES('administrador','Donec malesuada, augue eu hendrerit facilisis, justo lorem feugiat libero, a scelerisque ipsum libero in tellus. Etiam placerat placerat fringilla');

/* Inserts de Status */ 

INSERT INTO STATUS(sta_name,sta_description)
	VALUES('revisión','La cuenta no podrá ser usada hasta que se haya certificado su validez');
INSERT INTO STATUS(sta_name,sta_description)
	VALUES('certificada','La cuenta bancaria fue validada por el usuario a través del formulario donde indicó los 2 montos que se le fueron debitados por haber registrado su cuenta bancaria en el sistema. Ahora la cuenta se encuentra aprobada para su uso');
INSERT INTO STATUS(sta_name,sta_description)
	VALUES('rechazada','Si la cuenta bancaria es rechazada, debería de enviarse un correo notificándolo junto a los motivos del por qué fue rechazada');

