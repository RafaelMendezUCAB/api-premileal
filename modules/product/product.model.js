module.exports = {
/* --------------------------- GET ------------------------- */

  getAllProducts: (con) => {
    return con.query('SELECT * FROM PRODUCT').catch((error) => {
      return new Error(error);
    });
  },

  getProduct: (con, productID) => {
  	return con.query('SELECT * FROM PRODUCT WHERE pro_id = $1', [productID]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createProduct: (con, product) => {
  	return con.query('INSERT INTO PRODUCT(pro_name, pro_code) VALUES($1,$2)',
  	[product.name, product.code]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updateProduct: (con, productID, product) => {
  	return con.query('UPDATE PRODUCT SET pro_name = $1, pro_code = $2 WHERE pro_id = $3',
  	[product.name, product.code, productID]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteProduct: (con, productID) => {
  	return con.query('DELETE FROM PRODUCT WHERE pro_id = $1', [productID]).catch((error) => {
      return new Error(error);
    });
  },
};
