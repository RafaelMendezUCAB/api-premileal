module.exports = {
/* --------------------------- GET ------------------------- */

  getAllInvoices: (con) => {
    return con.query('SELECT * FROM INVOICE').catch((error) => {
      return new Error(error);
    });
  },

  getInvoice: (con, invoiceID) => {
  	return con.query('SELECT * FROM INVOICE WHERE i_id = $1', [invoiceID]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

  createInvoice: async (con, invoice) => {
    const invoiceCreated = await con.query('INSERT INTO INVOICE(i_units, i_amount, i_service_commission, i_gateway_commission, fk_payment_id) VALUES($1,$2,$3,$4,$5)',
  	[invoice.units, invoice.amount, invoice.service_commission, invoice.gateway_commission, invoice.paymentID]).catch((error) => {
      return new Error(error);
    });
    
    return 'Invoice successfully created.';

  },

/* -------------------------- PUT ---------------------------- */

  updateInvoice: (con, invoiceID, invoice) => {
  	return con.query('UPDATE INVOICE SET i_units = $1, i_amount = $2, i_service_commission = $3, i_gateway_commission = $4, fk_payment_id = $5 WHERE i_id = $6',
  	[invoice.units, invoice.amount, invoice.service_commission, invoice.gateway_commission, invoice.paymentID, invoiceID]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteInvoice: (con, invoiceID) => {
  	return con.query('DELETE FROM INVOICE WHERE i_id = $1', [invoiceID]).catch((error) => {
      return new Error(error);
    });
  },
};
