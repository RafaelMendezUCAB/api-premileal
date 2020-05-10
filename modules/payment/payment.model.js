module.exports = {
/* --------------------------- GET ------------------------- */

  getAllPayments: (con) => {
    return con.query('SELECT * FROM PAYMENT').catch((error) => {
      return new Error(error);
    });
  },

  getPayment: (con, paymentID) => {
  	return con.query('SELECT * FROM PAYMENT WHERE pay_id = $1', [paymentID]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createPayment: (con, payment) => {
  	return con.query('INSERT INTO PAYMENT(pay_amount, pay_res_cod, pay_description, fk_user_id, fk_bank_account,) VALUES($1,$2,$3,$4,$5)',
  	[payment.amount, payment.res_code, payment.description, payment.userID, payment.bankAccountID,]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updatePayment: (con, paymentID, payment) => {
  	return con.query('UPDATE PAYMENT SET pay_amount = $1, pay_res_cod = $2, pay_description = $3, fk_user_id = $4, fk_bank_account_id = $5, WHERE pay_id = $6',
  	[payment.pay_amount, payment.pay_res_cod, payment.pay_description, payment.u_pay_id, payment.ba_pay_id, paymentID]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deletePayment: (con, paymentID) => {
  	return con.query('DELETE FROM PAYMENT WHERE pay_id = $1', [paymentID]).catch((error) => {
      return new Error(error);
    });
  },
};
