module.exports = {
/* --------------------------- GET ------------------------- */

  getAllPlaces: (con) => {
    return con.query('SELECT * FROM PLACE').catch((error) => {
      return new Error(error);
    });
  },

  getPlace: (con,p_id) => {
  	return con.query('SELECT * FROM PLACE WHERE p_id = $1',[p_id]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createPlace: (con,place) => {
  	return con.query('INSERT INTO PLACE(p_name, p_type, fk_place) VALUES($1,$2,$3)',
  	[place.name, place.type, place.fk_place]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updatePlace: (con,p_id,place) => {
  	return con.query('UPDATE PLACE SET p_name = $1, p_type = $2, fk_place = $3 WHERE p_id = $4',
  	[place.p_name,place.p_type,place.fk_place,p_id]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deletePlace: (con,p_id) => {
  	return con.query('DELETE FROM PLACE WHERE p_id = $1',[p_id]).catch((error) => {
      return new Error(error);
    });
  },
};
