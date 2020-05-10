module.exports = {
/* --------------------------- GET ------------------------- */

  getAllHistoricStatus: (con) => {
    return con.query('SELECT * FROM HST_STA').catch((error) => {
      return new Error(error);
    });
  },

  getHistoricStatus: (con,hs_id) => {
  	return con.query('SELECT * FROM HST_STA WHERE hs_id = $1',[hs_id]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createHistoricStatus: (con,historicStatus) => {
  	return con.query('INSERT INTO HST_STA(hs_date, fk_user_offer_id, fk_payment_id, fk_user_id, fk_bank_account_id, fk_withdraw_id, fk_status_id) VALUES($1,$2,$3,$4,$5,$6,$7)',
  	[historicStatus.date, historicStatus.userOfferID, historicStatus.paymentID, historicStatus.userID, historicStatus.bankID, historicStatus.withdrawID, historicStatus.statusID]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updateHistoricStatus: (con,hs_id,historicStatus) => {
  	return con.query('UPDATE HST_STA SET hs_date = $1, fk_user_offer_id = $2, fk_payment_id = $3, fk_user_id = $4, fk_bank_account_id = $5, fk_withdraw_id = $6, fk_status_id = $7 WHERE hs_id = $8',
  	[historicStatus.date, historicStatus.userOfferID, historicStatus.paymentID, historicStatus.userID, historicStatus.bankID, historicStatus.withdrawID, historicStatus.statusID, hs_id]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteHistoricStatus: (con,hs_id) => {
  	return con.query('DELETE FROM HST_STA WHERE hs_id = $1',[hs_id]).catch((error) => {
      return new Error(error);
    });
  },
};
