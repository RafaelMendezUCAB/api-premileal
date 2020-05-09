module.exports = {
/* --------------------------- GET ------------------------- */

  getAllUserOffers: (con) => {
    return con.query('SELECT * FROM USER_OFFER').catch((error) => {
      return new Error(error);
    });
  },

  getUserOffer: (con,uo_id) => {
  	return con.query('SELECT * FROM USER_OFFER WHERE uo_id = $1',[uo_id]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

  postUserOffer: (con,userOffer) => {
  	return con.query('INSERT INTO USER_OFFER(o_uo_id,u_uo_id,pro_uo_id) VALUES($1,$2,$3)',
  	[userOffer.o_uo_id,userOffer.u_uo_id,userOffer.pro_uo_id]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

  putUserOffer: (con,uo_id,userOffer) => {
  	return con.query('UPDATE USER_OFFER SET o_uo_id = $1, u_uo_id = $2, pro_uo_id = $3 WHERE uo_id = $4',
  	[userOffer.o_uo_id,userOffer.u_uo_id,userOffer.pro_uo_id,uo_id]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteUserOffer: (con,uo_id) => {
  	return con.query('DELETE FROM USER_OFFER WHERE uo_id = $1',[uo_id]).catch((error) => {
      return new Error(error);
    });
  },
};
