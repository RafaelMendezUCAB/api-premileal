module.exports = {
/* --------------------------- GET ------------------------- */

  getAllHistoricStatus: (con) => {
    return con.query('SELECT * FROM HST_STA').catch((error) => {
      return new Error(error);
    });
  },

  getHistoricStatus: (con, historicStatusID) => {
  	return con.query('SELECT * FROM HST_STA WHERE hs_id = $1', [historicStatusID]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

  createHistoricStatus: (con, historicStatus) => {
  	return con.query('INSERT INTO HST_STA(hs_date, fk_user_offer_id, fk_payment_id, fk_user_id, fk_bank_account_id, fk_withdraw_id, fk_status_id) VALUES($1,$2,$3,$4,$5,$6,$7)',
  	[historicStatus.date, historicStatus.userOfferID, historicStatus.paymentID, historicStatus.userID, historicStatus.bankAccountID, historicStatus.withdrawID, historicStatus.statusID]).catch((error) => {
      return new Error(error);
    });
  },

  createUserStatus: (con, userID, userStatus) => {
    return con.query('INSERT INTO HST_STA(hs_date, fk_user_id, fk_status_id) VALUES(now(),$1,$2)',
    [userID, userStatus.statusID]).catch((error) => {
      return new Error(error);
    });
  },

  createBankAccountStatus: (con, bankAccountID, bankAccountStatus) => {
    return con.query('INSERT INTO HST_STA(hs_date, fk_bank_account_id, fk_status_id) VALUES(now(),$1,$2)',
    [bankAccountID, bankAccountStatus.statusID]).catch((error) => {
      return new Error(error);
    });
  },

  createPaymentStatus: async (con, historicStatus) => {
    const payment = await con.query('INSERT INTO HST_STA(hs_date, fk_payment_id, fk_status_id) VALUES(now(), '+historicStatus.paymentID+', '+historicStatus.statusID+')').catch((error) => {
      return new Error(error);
    });

    return 'Status created successfully.';
    
  },

/* -------------------------- PUT ---------------------------- */

  updateHistoricStatus: (con, historicStatusID, historicStatus) => {
  	return con.query('UPDATE HST_STA SET hs_date = $1, fk_user_offer_id = $2, fk_payment_id = $3, fk_user_id = $4, fk_bank_account_id = $5, fk_withdraw_id = $6, fk_status_id = $7 WHERE hs_id = $8',
  	[historicStatus.date, historicStatus.userOfferID, historicStatus.paymentID, historicStatus.userID, historicStatus.bankAccountID, historicStatus.withdrawID, historicStatus.statusID, historicStatusID]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteHistoricStatus: (con, historicStatusID) => {
  	return con.query('DELETE FROM HST_STA WHERE hs_id = $1', [historicStatusID]).catch((error) => {
      return new Error(error);
    });
  },
};
