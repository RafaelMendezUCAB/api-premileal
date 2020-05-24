const nodeCron = require('../../utils/nodecron/nodeCron');
const invoice = require('../invoice/invoice.model');

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

  createPayment: async (con, payment) => {
    const paymentCreated = await con.query('INSERT INTO PAYMENT(pay_amount, pay_res_cod, pay_description, fk_user_id, fk_bank_account_id) VALUES($1,$2,$3,$4,$5) RETURNING pay_id',
  	[payment.amount, payment.res_code, payment.description, payment.userID, payment.bankAccountID]).catch((error) => {
      return new Error(error);
    });
    
    return {
      paymentID: payment[0].pay_id,
      message: 'Payment successfully created.'
    }

  },

  pointsPurchase: async (con, payment) => {

    let paymentData = payment;

    /*--------------------------------------------------------------------------------
      Amounts must be multiplied by 100 because stripe reads integers, so for example, 
      12.50 would be 1250.
    --------------------------------------------------------------------------------*/

    try {
      const payment = await stripe.charges.create(
          {
            amount: paymentData.amount * 100,
            currency: 'usd',
            //source: 'ba_1GfX59BDr8hNIY5z8B4md4yk',
            source: paymentData.bankAccountID,
            description: 'Points purchase. Total points: '+ paymentData.points,
            //customer: 'cus_HDyHhHBY9h5ETD',
            customer: paymentData.customer
          }                        
      );

      payment.transactionID = payment.id;
      payment.status = 'Proccessing';

      nodeCron.addPayment(payment);

      const paymentRegistration = await module.exports.createPayment(con, {
        amount: paymentData.amount,
        res_code: paymentData.transactionID,
        description: 'Points purchase. Total points: '+ paymentData.points,
        userID: paymentData.userID,
        bankAccountID: paymentData.bankAccountID
      });
      
      if(paymentRegistration.message === 'Payment successfully created.'){
        paymentData.paymentID = paymentRegistration.paymentID; 

        const invoiceRegistration = await invoice.createInvoice(con, {
          units: paymentData.points,
          amount: paymentData.amount,
          service_commission: 'SELECT set_service_commission FROM SETTINGS',
          gateway_commission: 'SELECT set_gateway_commission FROM SETTINGS',
          paymentID: paymentData.paymentID
        });

        if(invoiceRegistration === 'Invoice successfully created.'){
          // Enviar correo de compra de puntos al usuario

          return 'Points payment successfully proccessed.';
        }        
      }

      return "Points payment couldn't be proccessed.";      

    } catch (error) {
        console.dir(error);
        res.send("Points payment couldn't be proccessed.");
    }

  },

/* -------------------------- PUT ---------------------------- */

  updatePayment: (con, paymentID, payment) => {
  	return con.query('UPDATE PAYMENT SET pay_amount = $1, pay_res_cod = $2, pay_description = $3, fk_user_id = $4, fk_bank_account_id = $5 WHERE pay_id = $6',
  	[payment.amount, payment.res_code, payment.description, payment.userID, payment.bankAccountID, paymentID]).catch((error) => {
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
