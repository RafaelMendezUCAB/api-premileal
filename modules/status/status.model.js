module.exports = {
/* --------------------------- GET ------------------------- */

  getAllStatus: (con) => {
    return con.query('SELECT * FROM STATUS').catch((error) => {
      return new Error(error);
    });
  },

  getStatus: (con, statusID) => {
  	return con.query('SELECT * FROM STATUS WHERE sta_id = $1', [statusID]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createStatus: (con, status) => {
  	return con.query('INSERT INTO STATUS(sta_name, sta_description) VALUES($1,$2)',
  	[status.name, status.description]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updateStatus: (con, statusID, status) => {
  	return con.query('UPDATE STATUS SET sta_name = $1, sta_description = $2 WHERE sta_id = $3',
  	[status.name, status.description, statusID]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteStatus: (con, statusID) => {
  	return con.query('DELETE FROM STATUS WHERE sta_id = $1', [statusID]).catch((error) => {
      return new Error(error);
    });
  },
};
