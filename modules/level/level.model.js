module.exports = {
/* --------------------------- GET ------------------------- */

  getAllLevels: (con) => {
    return con.query('SELECT * FROM LEVEL').catch((error) => {
      return new Error(error);
    });
  },

  getLevel: (con, levelID) => {
  	return con.query('SELECT * FROM LEVEL WHERE l_id = $1', [levelID]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createLevel: (con, level) => {
  	return con.query('INSERT INTO LEVEL(l_name, l_percentage, l_bonus, l_cost) VALUES($1,$2,$3,$4)',
  	[level.name, level.percentage, level.bonus, level.cost]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updateLevel: (con, levelID, level) => {
  	return con.query('UPDATE LEVEL SET l_name = $1, l_percentage = $2, l_bonus = $3, l_cost = $4 WHERE l_id = $5',
  	[level.name, level.percentage, level.bonus, level.cost, levelID]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteLevel: (con, levelID) => {
  	return con.query('DELETE FROM LEVEL WHERE l_id = $1', [levelID]).catch((error) => {
      return new Error(error);
    });
  },
};
