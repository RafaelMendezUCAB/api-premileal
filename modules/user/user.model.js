module.exports = {
  
/* --------------------------- GET ------------------------- */
  getAllUsers: (con) => {
    return con.query('SELECT * FROM USER_F').catch((error) => {
      return new Error(error);
    });
  },

  getUser: (con, userID) => {
  	return con.query('SELECT * FROM USER_F WHERE u_id = $1', [userID]).catch((error) => {
      return new Error(error);
    });
  },

  socialLogin: (con, email, type) => {
    return con.query("SELECT * FROM USER_F, ROLE, LEVEL WHERE u_email = '"+email+"' and u_type = '"+type+"' and fk_role_id = r_id and r_name = 'client' and fk_level_id = l_id").catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */
  createUser: (con, user) => {
  	return con.query('INSERT INTO USER_F(u_name, u_lastName, u_password, u_image, u_email, u_birthdate, u_points, u_type, fk_role_id, fk_place_id, fk_level_id) VALUES($1,$2,$3,$4,$5,$6,0,$7,1,$8,1)',
  	[user.name, user.lastName, user.password, user.image, user.email, user.birthdate, user.type, user.placeID]).catch((error) => {
      return new Error(error);
    });
  },

  registerUser: (con, user) => {
    return con
      .query(
        "INSERT INTO USER_F(u_name, u_lastName, u_password, u_image, u_email, u_birthdate, u_points, u_type, fk_role_id, fk_place_id, fk_level_id) VALUES('"+user.name +"', '"+user.lastName +"', '"+user.password +"', '"+user.image +"', '"+user.email+"', '"+user.birthdate +"', 0, '"+user.type+"', 1, "+user.placeID+", 1)"
      )
      .catch((error) => {
        return new Error(error);
      });
  },

/* -------------------------- PUT ---------------------------- */
updateUser: (con, userID, user) => {
  	return con.query('UPDATE USER_F SET u_name = $1, u_lastName = $2, u_password = $3, u_image = $4, u_email = $5, u_birthdate = $6, u_points = $7, u_type = $8, fk_role_id = $9, fk_place_id = $10, fk_level_id = $11 WHERE u_id = $12',
  	[user.name, user.lastName, user.password, user.image, user.email, user.birthdate, user.points, user.type, user.rolID, user.placeID, user.levelID, userID]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- DELETE -------------------------- */
  deleteUser: (con, userID) => {
  	return con.query('DELETE FROM USER_F WHERE u_id = $1', [userID]).catch((error) => {
      return new Error(error);
    });
  },
};
