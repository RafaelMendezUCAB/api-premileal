const stripe = require('stripe')('sk_test_h4hCvDfHyNy9OKbPiV74EUGQ00jMw9jpyV');

async function createBankAccountToken(bankAccount){
  try {
    const bankAccountToken = await stripe.tokens.create(
        {
          bank_account: {
            country: 'US',
            currency: 'usd',
            account_holder_name: bankAccount.accountHolderName,
            account_holder_type: 'individual',
            routing_number: '110000000',
            account_number: '000123456789',
          },
        }
    );
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

  getAllUserBankAccounts: (con, UserID) => {
    return con.query('SELECT ba_account_type as account_type, ba_routing_number as routing_number, ba_account_number as account_number, ba_check_number as check_number, ba_is_primary as is_primary FROM BANK_ACCOUNT WHERE fk_user_id = $1', [UserID]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

  

  createBankAccount: async (con, bankAccount) => {

    try {      
      var bankAccountToken = await createBankAccountToken(bankAccount);        
      var token = bankAccountToken.id;
      const stripeBankAccount = await stripe.customers.createSource(
          //'cus_HDyHhHBY9h5ETD',
          bankAccount.customer,
          {source: token}, 
      );

      var bankAccountToken = await createBankAccountToken(bankAccount);        
      var token = bankAccountToken.id;
      const stripeConnectBankAccount = await stripe.accounts.createExternalAccount(
        //'acct_1GftyGApQ49xnzhM',
        bankAccount.customerConnectAccount,
        {
          external_account: token,
        }            
    );

      return con.query('INSERT INTO BANK_ACCOUNT(ba_account_type, ba_routing_number, ba_account_number, ba_check_number, ba_is_primary, fk_user_id, ba_stripe_id, ba_stripe_connect_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
  	  [bankAccount.account_type, bankAccount.routing_number, bankAccount.account_number, bankAccount.check_number, bankAccount.is_primary, bankAccount.userID, stripeBankAccount.id, stripeConnectBankAccount.id]).catch((error) => {
        console.log(error);
        return new Error(error);
      });

    } catch (error) {
      console.log(error);
      return new Error(error);
    }
  	
  },

/* -------------------------- PUT ---------------------------- */

  updateBankAccount: (con, bankAccountID, bankAccount) => {
  	return con.query('UPDATE BANK_ACCOUNT SET ba_account_type = $1, ba_routing_number = $2, ba_account_number = $3, ba_check_number = $4, ba_is_primary = $5, fk_user_id = $6 WHERE ba_id = $7',
  	[bankAccount.account_type, bankAccount.routing_number, bankAccount.account_number, bankAccount.check_number, bankAccount.is_primary, bankAccount.userID, bankAccountID]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteBankAccount: (con, bankAccountID) => {
  	return con.query('DELETE FROM BANK_ACCOUNT WHERE ba_id = $1', [bankAccountID]).catch((error) => {
      return new Error(error);
    });
  },
};
