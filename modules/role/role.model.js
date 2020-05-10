module.exports = {
	/* --------------------------- GET ------------------------- */

  getAllRoles: (con) => {
    return con.query('SELECT * FROM ROLE').catch((error) => {
      return new Error(error);
    });
  },

  getRole: (con, roleID) => {
  	return con.query('SELECT * FROM ROLE WHERE r_id = $1', [roleID]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createRole: (con, role) => {
  	return con.query('INSERT INTO ROLE(r_name, r_description) VALUES($1,$2)',
  	[role.name, role.description]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updateRole: (con, roleID, role) => {
  	return con.query('UPDATE ROLE SET r_name = $1, r_description = $2 WHERE r_id = $3',
  	[role.name, role.description, roleID]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteRole: (con, roleID) => {
  	return con.query('DELETE FROM ROLE WHERE r_id = $1', [roleID]).catch((error) => {
      return new Error(error);
    });
  },
};
