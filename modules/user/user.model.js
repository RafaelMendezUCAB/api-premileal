module.exports = {
  getAllUsers: (con) => {
    return con.query("SELECT * FROM USER_F").catch((error) => {
      return new Error(error);
    });
  },
};
