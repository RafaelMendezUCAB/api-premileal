module.exports = {
/* --------------------------- GET ------------------------- */

  getAllValidations: (con) => {
    return con.query('SELECT * FROM VALIDATION').catch((error) => {
      return new Error(error);
    });
  },

  getValidation: (con, validationID) => {
  	return con.query('SELECT * FROM VALIDATION WHERE v_id = $1', [validationID]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

  createValidation: (con, validation) => {
  	return con.query('INSERT INTO VALIDATION(v_payment_1, v_payment_2, v_date, fk_user_id, fk_bank_account_id) VALUES($1,$2,now(),$3,$4)',
  	[validation.payment_1, validation.payment_2, validation.userID, validation.bankAccountID]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

  updateValidation: (con, validationID, validation) => {
  	return con.query('UPDATE VALIDATION SET v_payment_1 = $1, v_payment_2 = $2, v_date = $3, fk_user_id = $4, fk_bank_account_id = $5 WHERE v_id = $6',
  	[validation.payment_1, validation.payment_2, validation.date, validation.userID, validation.bankAccountID, validationID]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteValidation: (con, validationID) => {
  	return con.query('DELETE FROM VALIDATION WHERE v_id = $1', [validationID]).catch((error) => {
      return new Error(error);
    });
  },
};
