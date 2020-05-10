module.exports = {
/* --------------------------- GET ------------------------- */

  getAllValidations: (con) => {
    return con.query('SELECT * FROM VALIDATION').catch((error) => {
      return new Error(error);
    });
  },

  getValidation: (con,v_id) => {
  	return con.query('SELECT * FROM VALIDATION WHERE v_id = $1',[v_id]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createValidation: (con,validation) => {
  	return con.query('INSERT INTO VALIDATION(v_payment_1, v_payment_2, v_date, fk_user_id, fk_bank_account_id) VALUES($1,$2,now(),$3,$4)',
  	[validation.payment1, validation.payment2, validation.userID, validation.bankID]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updateValidation: (con,v_id,validation) => {
  	return con.query('UPDATE VALIDATION SET v_payment_1 = $1, v_payment_2 = $2, v_date = $3, u_v_id = $4, ba_v_id = $5 WHERE v_id = $6',
  	[validation.v_payment_1,validation.v_payment_2,validation.v_date,validation.u_v_id,validation.ba_v_id,v_id]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteValidation: (con,v_id) => {
  	return con.query('DELETE FROM VALIDATION WHERE v_id = $1',[v_id]).catch((error) => {
      return new Error(error);
    });
  },
};
