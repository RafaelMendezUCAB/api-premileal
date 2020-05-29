//const nodeCron = require('../../utils/nodecron/nodeCron');
const invoice = require('../invoice/invoice.model');
const sendgrid = require('../../utils/emails/sendgrid');
const stripe = require('stripe')('sk_test_FQkgogx8zMA3IYjubruKHZHT00rLNgcX9X');

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

  getUserPayments: (con, userID) => {
    return con.query("SELECT U.u_name as name, U.u_lastName as lastname, B.ba_name as bankname, PA.pay_amount as amount, PA.pay_description as description FROM PAYMENT PA, BANK_ACCOUNT BA, BANK B, USER_F U WHERE PA.fk_user_id = U.u_id AND PA.fk_bank_account_id = BA.ba_id AND BA.fk_bank_id = B.ba_id AND U.u_id = "+userID).catch((error) => {
      return new Error(error);
    });
  },

  getPendingPayments: async (con) => {

    var paymentsIDs = await con.query("select * from (select DISTINCT ON(fk_payment_id) * from hst_sta where fk_payment_id is not null order by fk_payment_id, hs_id desc) as status where status.fk_status_id = (SELECT STA_ID FROM STATUS WHERE STA_NAME = 'in process')").catch((error) => {
      return new Error(error);
    })
    
    if(paymentsIDs instanceof Array && paymentsIDs.length > 0){
      var payments = [];
      for(var i = 0; i < paymentsIDs.length; i++){
        var paymentInfo = await con.query('SELECT pay_id as "paymentID", pay_res_cod as "transactionID", fk_user_id as "userID", i_units as "points", u_preferred_language as "preferredLanguage", u_email as "userEmail", u_name as "userName" FROM PAYMENT, INVOICE, USER_F WHERE PAY_ID = '+paymentsIDs[i].fk_payment_id+' AND PAY_ID = FK_PAYMENT_ID AND FK_USER_ID = U_ID').catch((error) => {
          return new Error(error);
        });
        payments.push(paymentInfo[0]);
        const nodeCron = require('../../utils/nodecron/nodeCron');
        nodeCron.addPayment(paymentInfo[0]);
      }

    }

    return 'Payments Retrieved.';

  },

  notifyAdministrator: async(con, data) => {

    try {
      var administratorNotified = await sendgrid.sendEmail({
        to: 'premileal@gmail.com',
        templateID: 'd-069794eac70f4a739fa0578d50a7f10a', 
        atributes : {
          user: data.user.name,
          userEmail: data.user.email,
          bank: data.bankAccount.bank,
          accountRoutingNumber: data.bankAccount.routingNumber,
          accountNumber: data.bankAccount.accountNumber,
          accountCheckNumber: data.bankAccount.checkNumber
        }
      });

      return 'Administrator notified.';

    } catch (error) {
      console.log(error);
      return new Error(error);
    }

  },

/* ------------------------- POST -------------------------- */

  createPayment: async (con, payment) => {
    const paymentCreated = await con.query('INSERT INTO PAYMENT(pay_amount, pay_res_cod, pay_description, fk_user_id, fk_bank_account_id) VALUES($1,$2,$3,$4,$5) RETURNING pay_id',
  	[payment.amount, payment.res_code, payment.description, payment.userID, payment.bankAccountID]).catch((error) => {
      return new Error(error);
    });

    console.log("retorna: ", paymentCreated);
    
    return {
      paymentID: paymentCreated[0].pay_id,
      message: 'Payment successfully created.'
    }

  },

  pointsPurchase: async (con, payment) => {

    

    const bankAccountNotVerificated = await con.query("SELECT * FROM HST_STA WHERE fk_bank_account_id = "+payment.bankAccount.bankAccountID+" order by hs_id desc limit 1").catch((error) => {
      console.log(error);
      return new Error(error);
    });

    console.log(bankAccountNotVerificated);

    if(bankAccountNotVerificated.length > 0 && bankAccountNotVerificated[0].fk_status_id === 1){
      return 'Bank account is not verified.';
    }
    
    let paymentData = payment;
    console.log("PAYMENT TOTAL IS: ", paymentData.total)

    /*--------------------------------------------------------------------------------
      Amounts must be multiplied by 100 because stripe reads integers, so for example, 
      12.50 would be 1250.
    --------------------------------------------------------------------------------*/

    try {
      const payment = await stripe.charges.create(
          {
            amount: Math.floor(paymentData.total * 100),
            currency: 'usd',
            //source: 'ba_1GfX59BDr8hNIY5z8B4md4yk',
            source: paymentData.bankAccount.stripeID,
            description: 'Points purchase. Total points: '+ paymentData.points,
            //customer: 'cus_HDyHhHBY9h5ETD',
            customer: paymentData.customer
          }                        
      ).catch((error) => {
        console.log(error);
        return new Error(error);
      });

      paymentData.transactionID = payment.id;
      paymentData.status = 'Proccessing';    
      console.log("Id de transaccion: ", paymentData.transactionID);

      const paymentRegistration = await module.exports.createPayment(con, {
        amount: paymentData.total,
        res_code: paymentData.transactionID,
        description: 'Points purchase. Total points: '+ paymentData.points,
        userID: paymentData.userID,
        bankAccountID: paymentData.bankAccount.bankAccountID
      });
      
      if(paymentRegistration.message === 'Payment successfully created.'){
        paymentData.paymentID = paymentRegistration.paymentID; 

        const invoiceRegistration = await invoice.createInvoice(con, {
          units: paymentData.points,
          amount: paymentData.amount,
          service_commission: paymentData.serviceCommision,
          gateway_commission: paymentData.stripeCommision,
          paymentID: paymentData.paymentID
        });

        if(invoiceRegistration === 'Invoice successfully created.'){

          const nodeCron = require('../../utils/nodecron/nodeCron');
          nodeCron.addPayment(paymentData);

          var emailTemplateID = '';
          if(paymentData.preferredLanguage === 'en-us'){
            emailTemplateID = 'd-c8f6ba309a9741c986d145c80143ddbc'
          }
          else {
            emailTemplateID = "d-b25853caba68468ea5c6b10c8b9a53df"
          }

          const email = await sendgrid.sendEmail({
            to: paymentData.userEmail,
            templateID: emailTemplateID,  // Payment ID.
            atributes : {
              numberPoints: paymentData.points,
              dollarAmount: paymentData.total,
              serviceCommission: paymentData.serviceCommision,
              statusPoints: 'Proccessing payment.'
            }
          });

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

  testPay: async (con, file) => {

    console.log("file is: ", file);

    const email = await sendgrid.sendEmail({
      to: 'rmendeznieves98@gmail.com',
      templateID: 'd-c8f6ba309a9741c986d145c80143ddbc', 
      atributes : {
        numberPoints: 100,
        dollarAmount: 1500,
        serviceCommission: 0.75,
        statusPoints: 'Proccessing payment.'
      },
      attachments: [
        {
          filename: file.originalname,
          type: file.mymetype,
          content: file.buffer.toString("base64"),
        },
      ],
    });

  }
};
