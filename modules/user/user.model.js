module.exports = {
  
/* --------------------------- GET ------------------------- */
  getAllUsers: (con) => {
    return con.query('SELECT * FROM USER_F').catch((error) => {
      return new Error(error);
    });
  },

  getUser: (con,u_id) => {
  	return con.query('SELECT * FROM USER_F WHERE u_id = $1',[u_id]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */
createUser: (con,user) => {
  	return con.query('INSERT INTO USER_F(u_name, u_lastName, u_password, u_image, u_email, u_birthdate, u_points, u_type, fk_rol_id, fk_place_id, fk_level_id) VALUES($1,$2,$3,$4,$5,$6,0,$7,1,$8,1)',
  	[user.name, user.lastName, user.password, user.image, user.email, user.birthdate, user.type, user.placeID]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */
updateUser: (con,u_id,user) => {
  	return con.query('UPDATE USER_F SET u_name = $1, u_lastName = $2, u_password = $3, u_image = $4, u_email = $5, u_birthdate = $6, u_points = $7, r_u_id = $8, p_u_id = $9, l_u_id = $10 WHERE u_id = $11',
  	[user.name, user.lastName, user.password, user.image, user.email, user.birthdate, user.points, user.fk_rol_id, user.fk_place_id, user.fk_level_id, u_id]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- DELETE -------------------------- */
  deleteUser: (con,u_id) => {
  	return con.query('DELETE FROM USER_F WHERE u_id = $1',[u_id]).catch((error) => {
      return new Error(error);
    });
  },
};
