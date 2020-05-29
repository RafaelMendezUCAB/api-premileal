module.exports = {
/* --------------------------- GET ------------------------- */

  getAllUserOffers: (con) => {
    return con.query('SELECT * FROM USER_OFFER').catch((error) => {
      return new Error(error);
    });
  },

  getUserOffer: (con, userOfferID) => {
  	return con.query('SELECT * FROM USER_OFFER WHERE uo_id = $1', [userOfferID]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

  createUserOffer: (con, userOffer) => {
  	return con.query('INSERT INTO USER_OFFER(fk_offer_id, fk_user_id, fk_product_id) VALUES($1,$2,$3)',
  	[userOffer.offerID, userOffer.userID, userOffer.productID]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

  updateUserOffer: (con, userOfferID, userOffer) => {
  	return con.query('UPDATE USER_OFFER SET fk_offer_id = $1, fk_user_id = $2, fk_product_id = $3 WHERE uo_id = $4',
  	[userOffer.offerID, userOffer.userID, userOffer.productID, userOfferID]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteUserOffer: (con, userOfferID) => {
  	return con.query('DELETE FROM USER_OFFER WHERE uo_id = $1', [userOfferID]).catch((error) => {
      return new Error(error);
    });
  },
};
