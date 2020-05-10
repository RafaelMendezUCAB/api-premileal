module.exports = {
/* --------------------------- GET ------------------------- */

  getAllSettings: (con) => {
    return con.query('SELECT * FROM SETTINGS').catch((error) => {
      return new Error(error);
    });
  },

  getSetting: (con,set_id) => {
  	return con.query('SELECT * FROM SETTINGS WHERE set_id = $1',[set_id]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createSettings: (con,settings) => {
  	return con.query('INSERT INTO SETTINGS(set_service_commission,set_gateway_commission,set_dolar_value,set_gold_income) VALUES($1,$2,$3,$4)',
  	[settings.set_service_commission,settings.set_gateway_commission,settings.set_dolar_value,settings.set_gold_income]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updateSettings: (con,set_id,settings) => {
  	return con.query('UPDATE SETTINGS SET set_service_commission = $1,set_gateway_commission = $2,set_dolar_value = $3,set_gold_income = $4 WHERE set_id = $5',
  	[settings.set_service_commission,settings.set_gateway_commission,settings.set_dolar_value,settings.set_gold_income,set_id]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteSettings: (con,set_id) => {
  	return con.query('DELETE FROM SETTINGS WHERE set_id = $1',[set_id]).catch((error) => {
      return new Error(error);
    });
  },
};
