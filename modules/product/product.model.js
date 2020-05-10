module.exports = {
/* --------------------------- GET ------------------------- */

  getAllProducts: (con) => {
    return con.query('SELECT * FROM PRODUCT').catch((error) => {
      return new Error(error);
    });
  },

  getProduct: (con,pro_id) => {
  	return con.query('SELECT * FROM PRODUCT WHERE pro_id = $1',[pro_id]).catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */

createProduct: (con,product) => {
  	return con.query('INSERT INTO PRODUCT(pro_name, pro_code) VALUES($1,$2)',
  	[product.name, product.code]).catch((error) => {
      return new Error(error);
    });
  },

/* -------------------------- PUT ---------------------------- */

updateProduct: (con,pro_id,product) => {
  	return con.query('UPDATE PRODUCT SET pro_name = $1,pro_code = $2 WHERE pro_id = $3',
  	[product.pro_name,product.pro_code,pro_id]).catch((error) => {
      return new Error(error);
    });
  },
/* ------------------------- DELETE -------------------------- */

  deleteProduct: (con,pro_id) => {
  	return con.query('DELETE FROM PRODUCT WHERE pro_id = $1',[pro_id]).catch((error) => {
      return new Error(error);
    });
  },
};
