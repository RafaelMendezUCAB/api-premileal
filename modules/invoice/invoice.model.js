module.exports = {
/* --------------------------- GET ------------------------- */

  getAllInvoices: (con) => {
    return con.query('SELECT * FROM INVOICE').catch((error) => {
      return new Error(error);
    });
  },

  getInvoice: (con,i_id) => {
  	return con.query('SELECT * FROM INVOICE WHERE i_id = $1',[i_id]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createInvoice: (con,invoice) => {
  	return con.query('INSERT INTO INVOICE(i_units, i_amount, i_service_commission, i_gateway_commission, fk_payment_id) VALUES($1,$2,$3,$4,$5)',
  	[invoice.units, invoice.amount, invoice.service_commission, invoice.gateway_commission, invoice.paymentID]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updateInvoice: (con,i_id,invoice) => {
  	return con.query('UPDATE INVOICE SET i_units = $1, i_amount = $2, i_service_commission = $3, i_gateway_commission = $4 WHERE i_id = $5',
  	[invoice.units, invoice.amount, invoice.service_commission, invoice.gateway_commission, i_id]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteInvoice: (con,i_id) => {
  	return con.query('DELETE FROM INVOICE WHERE i_id = $1',[i_id]).catch((error) => {
      return new Error(error);
    });
  },
};
