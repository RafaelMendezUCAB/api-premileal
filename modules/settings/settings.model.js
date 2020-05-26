module.exports = {
/* --------------------------- GET ------------------------- */

  getAllSettings: (con) => {
    return con.query('SELECT * FROM SETTINGS').catch((error) => {
      return new Error(error);
    });
  },

  getSetting: (con, settingsID) => {
  	return con.query('SELECT * FROM SETTINGS WHERE set_id = $1', [settingsID]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createSettings: (con, settings) => {
  	return con.query('INSERT INTO SETTINGS(set_service_commission, set_gateway_commission, set_dolar_value, set_gold_income) VALUES($1,$2,$3,$4)',
  	[settings.service_commission, settings.gateway_commission, settings.dolar_value, settings.gold_income]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updateSettings: async (con, settings) => {
    const updatedSettings = await con.query('UPDATE SETTINGS SET set_service_commission = $1, set_gateway_commission = $2, set_dolar_value = $3, set_gold_income = $4',
  	[settings.serviceCommission, settings.gatewayCommission, settings.dolarValue, settings.goldIncome]).catch((error) => {
      return new Error(error);
    });  

  	return 'Settings successfully updated.'
  },
/* ------------------------- DELETE -------------------------- */

  deleteSettings: (con, settingsID) => {
  	return con.query('DELETE FROM SETTINGS WHERE set_id = $1', [settingsID]).catch((error) => {
      return new Error(error);
    });
  },
};
