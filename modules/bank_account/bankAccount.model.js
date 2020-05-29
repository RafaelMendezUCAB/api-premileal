const stripe = require('stripe')('sk_test_h4hCvDfHyNy9OKbPiV74EUGQ00jMw9jpyV');
const sendgrid = require('../../utils/emails/sendgrid');

async function createBankAccountToken(bankAccount){
  try {
    const bankAccountToken = await stripe.tokens.create(
        {
          bank_account: {
            country: 'US',
            currency: 'usd',
            account_holder_name: bankAccount.holderName,
            account_holder_type: 'individual',
            //routing_number: '110000000',
            routing_number: bankAccount.routingNumber,
            account_number: '000123456789',
          },
        }
    ).catch((error) => {
      console.log(error);
      return new Error(error);
    });

    return bankAccountToken;

  } catch (error) {
    return new Error(error);
  }
};

module.exports = {
/* --------------------------- GET ------------------------- */

  getAllBankAccounts: (con) => {
    return con.query('SELECT * FROM BANK_ACCOUNT').catch((error) => {
      return new Error(error);
    });
  },

  getBankAccount: (con, bankAccountID) => {
  	return con.query('SELECT * FROM BANK_ACCOUNT WHERE ba_id = $1', [bankAccountID]).catch((error) => {
      return new Error(error);
    });
  },

  getAllUserBankAccounts: async (con, UserID) => {
    var userBankAccounts = await con.query("SELECT bacc.ba_id as \"bankAccountID\", bacc.ba_account_type as \"accountType\", bacc.ba_routing_number as \"routingNumber\", bacc.ba_account_number as \"accountNumber\", bacc.ba_check_number as \"checkNumber\", bacc.ba_is_primary as \"isPrimary\", bacc.ba_holder_name as \"holderName\", ba_stripe_id as \"stripeID\", ba_stripe_connect_id as \"stripeConnectID\", b.ba_name as bank FROM BANK_ACCOUNT bacc, BANK b WHERE fk_user_id = $1 AND bacc.fk_bank_id = b.ba_id", [UserID]).catch((error) => {
      console.log(error) ;
      return new Error(error);
    });
    
    if(userBankAccounts instanceof Array && userBankAccounts.length === 0){
      return 'No bank accounts registered.';
    }

    var status;
    var i = 0;

    while(i < userBankAccounts.length){
      status = await con.query("SELECT sta_name as status FROM STATUS, HST_STA WHERE fk_bank_account_id = "+userBankAccounts[i].bankAccountID+" AND fk_status_id = sta_id order by hs_id desc limit 1").catch((error) => {
        console.log(error) ;
        return new Error(error);
      });
      userBankAccounts[i].status = status[0].status;
      i++;
    }    
        
    return userBankAccounts;

  },

  getBankAccountStatus: async (con, bankAccountID) => {
    var bankAccountData = {
      bankAccount: {},
      movements: []
    };

    const account = await con.query('select ba_account_type as type, ba_routing_number as routing_number, ba_account_number as account_number, ba_check_number as check_number, ba_is_primary as is_primary, sta_name as status from status, hst_sta, bank_account where fk_bank_account_id = '+bankAccountID+'  and fk_status_id = sta_id and fk_bank_account_id = ba_id order by sta_id desc limit 1').catch((error) => {
      return new Error(error);
    });

    bankAccountData.bankAccount = account[0];

    /*const payments = await con.query('select DISTINCT ON(status.fk_payment_id) status.hs_date as date, status.fk_payment_id as payment, status.fk_status_id as status from (select * from hst_sta, payment p where fk_payment_id is not null and p.pay_id = fk_payment_id and p.fk_bank_account_id = '+bankAccountID+' order by hs_id desc) as status').catch((error) => {
      return new Error(error);
    });*/

    const payments = await con.query("select * from payment pa, hst_sta his where pa.fk_bank_account_id = "+bankAccountID+" and pa.pay_id = his.fk_payment_id and his.fk_status_id = (select sta_id from status where sta_name = 'in process')").catch((error) => {
      return new Error(error);
    });

    payments.forEach(payment => {
      bankAccountData.movements.push(payment);
    });

    /*const withdraws = await con.query('select DISTINCT ON(status.fk_withdraw_id) status.hs_date as date, status.fk_withdraw_id as withdraw, status.fk_status_id as status from (select * from hst_sta, withdraw w where fk_withdraw_id is not null and w.w_id = fk_withdraw_id and w.fk_bank_account_id = '+bankAccountID+' order by hs_id desc) as status').catch((error) => {
      return new Error(error);
    });

    withdraws.forEach(withdraw => {
      bankAccountData.movements.push(withdraw);
    });*/


    return bankAccountData;
  },

/* ------------------------- POST -------------------------- */
  createBankAccount: async (con, bankAccount) => {

    const bankAccountExists = await con.query("SELECT * FROM BANK_ACCOUNT WHERE BA_ROUTING_NUMBER = '"+bankAccount.routingNumber+"' AND BA_ACCOUNT_NUMBER = '"+bankAccount.accountNumber+"'").catch((error) => {
      return new Error(error);
    });

    if(bankAccountExists.length > 0){
      return 'Bank account already exists.';
    }
    else {
      try {      
        var bankAccountToken = await createBankAccountToken(bankAccount);        
        var token = bankAccountToken.id;
        const stripeBankAccount = await stripe.customers.createSource(
            bankAccount.customer,
            {source: token}, 
        ).catch((error) => {
          console.log(error);
          return new Error(error);
        });
  
        var bankAccountToken = await createBankAccountToken(bankAccount);        
        var token = bankAccountToken.id;
        const stripeConnectBankAccount = await stripe.accounts.createExternalAccount(
          bankAccount.customerConnectAccount,
          {
            external_account: token,
          }            
        ).catch((error) => {
          console.log(error);
          return new Error(error);
        });
  
        const bankAccountCreatedID = await con.query('INSERT INTO BANK_ACCOUNT(ba_account_type, ba_routing_number, ba_account_number, ba_check_number, ba_is_primary, fk_user_id, ba_stripe_id, ba_stripe_connect_id, ba_holder_name, fk_bank_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, (select ba_id from bank where ba_name = \''+bankAccount.bank+'\')) RETURNING ba_id',
        ['checking', bankAccount.routingNumber, bankAccount.accountNumber, bankAccount.checkNumber, bankAccount.isPrimary, bankAccount.userID, stripeBankAccount.id, stripeConnectBankAccount.id, bankAccount.holderName]).catch((error) => {
          console.log(error);
          return new Error(error);
        });

        let deposit1 = Math.round((Math.random() * (1.26 - 0.75) + 0.75) * 100.0) / 100.0;
        let deposit2 = Math.round((2.50 - deposit1) * 100.0) / 100.0;

        console.log("Deposits are: ", deposit1, ' - ', deposit2);
        console.log("Deposits sum = ", deposit1 + deposit2);

        const validation = await con.query('INSERT INTO VALIDATION(v_payment_1, v_payment_2, v_date, fk_user_id, fk_bank_account_id) values('+deposit1+', '+deposit2+', now(), '+bankAccount.userID+', '+bankAccountCreatedID[0].ba_id+')').catch((error) => {
          console.log(error);
          return new Error(error);
        });

        var user = await con.query('SELECT * FROM USER_F WHERE U_ID = '+bankAccount.userID).catch((error) => {
          console.log(error);
          return new Error(error);
        });

        user = user[0];

        var emailTemplateID = '';
        if(user.u_preferred_language === 'en-us'){
          emailTemplateID = 'd-65e6834c7ca64e66a9eb68c9f28d890a'
        }
        else {
          emailTemplateID = "d-3d9690c526ef4655a7b994cf1e5cd411"
        }

        const email = await sendgrid.sendEmail({
          to: user.u_email,
          templateID: emailTemplateID,  // Welcome template ID
          atributes : {
            name: user.u_name + ' ' + user.u_lastName,
            bank: bankAccount.bank,
            accountHolderName: bankAccount.holderName,
            accountRoutingNumber: bankAccount.routingNumber,
            accountNumber: bankAccount.accountNumber,

          }
        }).catch((error) => {
          console.log(error);
          return new Error(error);
        });

        return 'Bank account created.';
  
      } catch (error) {
        console.log(error);
        return new Error(error);
      }
    }
      	
  },

/* -------------------------- PUT ---------------------------- */

  updateBankAccount: async (con, bankAccountID, data) => {    
    try {
      const stripeUserDataUpdated = await stripe.customers.updateSource(
        /*'cus_HMdscgzLUrecjZ',
        'ba_1GnuWcBDr8hNIY5z44ocl750', */ 
          data.userData.stripe_id,
          data.bankAccount.stripeID,
        {
          account_holder_name: data.bankAccount.holderName
        }
      ).catch((error) => {
        console.log(error);
        return new Error(error);
      });
  
      const stripeConnectUserDataUpdated = await stripe.accounts.updateExternalAccount(
        /*'acct_1GcuLfBDr8hNIY5z',
        'ba_1GnuWcBDr8hNIY5z44ocl750',*/
        data.userData.stripe_connect_id,
        data.bankAccount.stripeConnectID,
        {
          account_holder_name: data.bankAccount.holderName
        },
        
      ).catch((error) => {
        console.log(error);
        return new Error(error);
      });
  
      const udatedBankAccount = await con.query("UPDATE BANK_ACCOUNT SET ba_holder_name = '"+data.bankAccount.holderName+"' WHERE ba_id = "+bankAccountID).catch((error) => {
        return new Error(error);
      });
  
      return 'Bank Account successfully updated.';
    } catch (error) {
      return new Error(error);
    }
  },

  verifyBankAccount: async (con, bankAccountID, bankAccount) => {

    const validationValues = await con.query('SELECT * FROM VALIDATION WHERE fk_bank_account_id = '+bankAccountID).catch((error) => {
      return new Error(error);
    });

    let validationAmount1 = validationValues[0].v_payment_1;
    let validationAmount2 = validationValues[0].v_payment_2;    

    console.log(validationAmount1);
    console.log(validationAmount2)
    console.log(parseFloat(bankAccount.firstCharge));
    console.log(parseFloat(bankAccount.secondCharge));

    if((validationAmount1 === parseFloat(bankAccount.firstCharge) && validationAmount2 === parseFloat(bankAccount.secondCharge)) || (validationAmount2 === parseFloat(bankAccount.firstCharge) && validationAmount1 === parseFloat(bankAccount.secondCharge))){
      try {    

        const verificationInformation = await stripe.customers.verifySource(
            //'cus_HDyHhHBY9h5ETD',
            bankAccount.user.stripe_id,
            //'ba_1GfYfOBDr8hNIY5zZ61sB1Tq',
            bankAccount.bankAccount.stripeID,
            {amounts: [32, 45]}            
        ).catch((error) => {
          console.log(error);
          return new Error(error);
        });

        const historicStatusModel = require("../hst_sta/historicStatus.model");

        const localVerification = await historicStatusModel.createBankAccountStatus(con, bankAccountID, {statusID: 2});

        var emailTemplateID = '';
        if(bankAccount.user.preferredLanguage === 'en-us'){
          emailTemplateID = 'd-b115f83974764464b5b93c35ba986e43'
        }
        else {
          emailTemplateID = "d-f9be3c3754cf4f908a8065f436332e26"
        }
        
        const email = await sendgrid.sendEmail({
          to: bankAccount.user.email,
          templateID: emailTemplateID,  // Bank account verified template ID
          atributes : {
            bank: bankAccount.bankAccount.bank,
            accountRoutingNumber: bankAccount.bankAccount.routingNumber,
            accountNumber: bankAccount.bankAccount.accountNumber
          }
        });

        return 'Sucessfull validation.';
  
      } catch (error) {
          console.dir(error);
          return "Bank Account couldn't be verified.";
      }
    } 
    else {
      return 'Invalid amounts.';
    }       
    
  },

  setBankAccountPrimary: async (con, bankAccountID, userID) => {

    const nowPrimaryAccounts = await con.query("UPDATE bank_account SET ba_is_primary = false WHERE fk_user_id = "+userID).catch((error) => {
      return new Error(error);
    });

    const updatedNewPrimaryBankAccount = await con.query("UPDATE bank_account SET ba_is_primary = true WHERE ba_id = "+bankAccountID).catch((error) => {
      return new Error(error);
    });

    return "Bank Account now is primary.";

  },
/* ------------------------- DELETE -------------------------- */

  deleteBankAccount: async (con, bankAccountID, bankAccount) => {

    try {
      
      const deletedBankAccount = await stripe.customers.deleteSource(
        //'cus_HIXY7Ud6FbcSCk',
        //'ba_1GfukjBDr8hNIY5zpcHhp38y', 
        bankAccount.customer,
        bankAccount.stripeID           
        ).catch((error) => {
          console.log(error);
          return new Error(error);
        });
    
      /*const deletedConnectBankAccount = await stripe.accounts.deleteExternalAccount(
          //'acct_1GcuLfBDr8hNIY5z',
          //'ba_1GfukjBDr8hNIY5zpcHhp38y',  
          bankAccount.stripeConnectUserAccountID,
          bankAccount.stripeConnectBankAccountID              
        );*/

      const userDeleted = await con.query('DELETE FROM BANK_ACCOUNT WHERE ba_id = $1', [bankAccountID]).catch((error) => {
        console.log(error);
        return new Error(error);
      });

      return 'Bank Account successfully deleted.';

    } catch (error) {
      console.dir(error);
      return "Bank Account couldn't be deleted.";
    }
  	
  },
};
