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
  	return con.query('INSERT INTO INVOICE(i_units,i_amount,i_service_commission,i_pasarela_commission) VALUES($1,$2,$3,$4)',
  	[invoice.i_units,invoice.i_amount,invoice.i_service_commission,invoice.i_pasarela_commission]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updateInvoice: (con,i_id,invoice) => {
  	return con.query('UPDATE INVOICE SET i_units = $1,i_amount = $2,i_service_commission = $3,i_pasarela_commission = $4 WHERE i_id = $5',
  	[invoice.i_units,invoice.i_amount,invoice.i_service_commission,invoice.i_pasarela_commission,i_id]).catch((error) => {
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
