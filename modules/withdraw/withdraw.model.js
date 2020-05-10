module.exports = {
/* --------------------------- GET ------------------------- */

  getAllWithdraws: (con) => {
    return con.query('SELECT * FROM WITHDRAW').catch((error) => {
      return new Error(error);
    });
  },

  getWithdraw: (con, withdrawID) => {
  	return con.query('SELECT * FROM WITHDRAW WHERE w_id = $1', [withdrawID]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createWithdraw: (con, withdraw) => {
  	return con.query('INSERT INTO WITHDRAW(w_points,w_dolars,fk_user_id,fk_bank_account_id) VALUES($1,$2,$3,$4)',
  	[withdraw.points, withdraw.dolars, withdraw.userID, withdraw.bankAccountID]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updateWithdraw: (con, withdrawID, withdraw) => {
  	return con.query('UPDATE WITHDRAW SET w_points = $1, w_dolars = $2, fk_user_id = $3, fk_bank_account_id = $4 WHERE w_id = $5',
  	[withdraw.points, withdraw.dolars, withdraw.userID, withdraw.bankAccountID, withdrawID]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteWithdraw: (con, withdrawID) => {
  	return con.query('DELETE FROM WITHDRAW WHERE w_id = $1', [withdrawID]).catch((error) => {
      return new Error(error);
    });
  },
};
