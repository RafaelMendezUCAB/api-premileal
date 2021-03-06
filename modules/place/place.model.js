module.exports = {
/* --------------------------- GET ------------------------- */

  getAllPlaces: (con) => {
    return con.query('SELECT * FROM PLACE').catch((error) => {
      return new Error(error);
    });
  },

  getPlace: (con, placeID) => {
  	return con.query('SELECT * FROM PLACE WHERE p_id = $1', [placeID]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

  createPlace: (con, place) => {
  	return con.query('INSERT INTO PLACE(p_acronym, p_name, p_type, fk_place_id) VALUES($1,$2,$3,$4)',
  	[place.acronym, place.name, place.type, place.fk_place]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

  updatePlace: (con, placeID, place) => {
  	return con.query('UPDATE PLACE SET p_acronym = $1, p_name = $2, p_type = $3, fk_place_id = $4 WHERE p_id = $5',
  	[place.acronym, place.name, place.type, place.fk_place, placeID]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deletePlace: (con, placeID) => {
  	return con.query('DELETE FROM PLACE WHERE p_id = $1', [placeID]).catch((error) => {
      return new Error(error);
    });
  },
};
