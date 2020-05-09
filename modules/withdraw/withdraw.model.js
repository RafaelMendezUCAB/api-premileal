module.exports = {
/* --------------------------- GET ------------------------- */

  getAllWithdraws: (con) => {
    return con.query('SELECT * FROM WITHDRAW').catch((error) => {
      return new Error(error);
    });
  },

  getWithdraw: (con,w_id) => {
  	return con.query('SELECT * FROM WITHDRAW WHERE w_id = $1',[w_id]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

  postWithdraw: (con,withdraw) => {
  	return con.query('INSERT INTO WITHDRAW(w_points,w_dolars,u_w_id,ba_w_id) VALUES($1,$2,$3,$4)',
  	[withdraw.w_points,withdraw.w_dolars,withdraw.u_w_id,withdraw.ba_w_id]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

  putWithdraw: (con,w_id,withdraw) => {
  	return con.query('UPDATE WITHDRAW SET w_points = $1, w_dolars = $2, u_w_id = $3, ba_w_id = $4 WHERE w_id = $5',
  	[withdraw.w_points,withdraw.w_dolars,withdraw.u_w_id,withdraw.ba_w_id,w_id]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteWithdraw: (con,w_id) => {
  	return con.query('DELETE FROM WITHDRAW WHERE w_id = $1',[w_id]).catch((error) => {
      return new Error(error);
    });
  },
};
