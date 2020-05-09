module.exports = {
/* --------------------------- GET ------------------------- */

  getAllHistoricStatus: (con) => {
    return con.query('SELECT * FROM HST_STA').catch((error) => {
      return new Error(error);
    });
  },

  getHistoricStatus: (con,hs_id) => {
  	return con.query('SELECT * FROM HST_STA WHERE hs_id = $1',[hs_id]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

  postHistoricStatus: (con,historicStatus) => {
  	return con.query('INSERT INTO HST_STA(hs_date,uo_hs_id,pay_hs_id,u_hs_id,ba_hs_id,w_hs_id,s_hs_id) VALUES($1,$2,$3,$4,$5,$6,$7)',
  	[historicStatus.hs_date,historicStatus.uo_hs_id,historicStatus.pay_hs_id,historicStatus.u_hs_id,historicStatus.ba_hs_id,historicStatus.w_hs_id,historicStatus.s_hs_id]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

  putHistoricStatus: (con,hs_id,historicStatus) => {
  	return con.query('UPDATE HST_STA SET hs_date = $1, uo_hs_id = $2, pay_hs_id = $3, u_hs_id = $4, ba_hs_id = $5, w_hs_id = $6, s_hs_id = $7 WHERE hs_id = $8',
  	[historicStatus.hs_date,historicStatus.uo_hs_id,historicStatus.pay_hs_id,historicStatus.u_hs_id,historicStatus.ba_hs_id,historicStatus.w_hs_id,historicStatus.s_hs_id,hs_id]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteHistoricStatus: (con,hs_id) => {
  	return con.query('DELETE FROM HST_STA WHERE hs_id = $1',[hs_id]).catch((error) => {
      return new Error(error);
    });
  },
};
