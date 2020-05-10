module.exports = {
/* --------------------------- GET ------------------------- */

  getAllBankAccounts: (con) => {
    return con.query('SELECT * FROM BANK_ACCOUNT').catch((error) => {
      return new Error(error);
    });
  },

  getBankAccount: (con,ba_id) => {
  	return con.query('SELECT * FROM BANK_ACCOUNT WHERE ba_id = $1',[ba_id]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createBankAccount: (con,bankAccount) => {
  	return con.query('INSERT INTO BANK_ACCOUNT(ba_account_type, ba_routing_number, ba_account_number, ba_check_number, ba_is_primary, fk_user_id) VALUES($1,$2,$3,$4,$5,$6)',
  	[bankAccount.account_type, bankAccount.routing_number, bankAccount.account_number, bankAccount.check_number, bankAccount.is_primary, bankAccount.userID]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updateBankAccount: (con,ba_id,bankAccount) => {
  	return con.query('UPDATE BANK_ACCOUNT SET ba_account_type = $1, ba_routing_number = $2, ba_account_number = $3, ba_check_number = $4, ba_is_primary = $5, u_ba_id = $6 WHERE ba_id = $7',
  	[bankAccount.account_type, bankAccount.routing_number, bankAccount.account_number, bankAccount.check_number, bankAccount.is_primary, bankAccount.userID, ba_id]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteBankAccount: (con,ba_id) => {
  	return con.query('DELETE FROM BANK_ACCOUNT WHERE ba_id = $1',[ba_id]).catch((error) => {
      return new Error(error);
    });
  },
};
