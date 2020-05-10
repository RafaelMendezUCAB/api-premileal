module.exports = {
/* --------------------------- GET ------------------------- */

  getAllOffers: (con) => {
    return con.query('SELECT * FROM OFFER').catch((error) => {
      return new Error(error);
    });
  },

  getOffer: (con,o_id) => {
  	return con.query('SELECT * FROM OFFER WHERE o_id = $1',[o_id]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createOffer: (con,offer) => {
  	return con.query('INSERT INTO OFFER(o_name, o_valid_through, o_percentage) VALUES($1,$2,$3)',
  	[offer.name, offer.valid_through, offer.percentage]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updateOffer: (con,o_id,offer) => {
  	return con.query('UPDATE OFFER SET o_name = $1,o_valid_through = $2,o_percentage = $3 WHERE o_id = $4',
  	[offer.o_name,offer.o_valid_through,offer.o_percentage,o_id]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteOffer: (con,o_id) => {
  	return con.query('DELETE FROM OFFER WHERE o_id = $1',[o_id]).catch((error) => {
      return new Error(error);
    });
  },
};
