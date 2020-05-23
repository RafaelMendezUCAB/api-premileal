module.exports = {

/* --------------------------- GET ------------------------- */
    getAllBanks: (con) => {
      return con.query('SELECT ba_id as "bankID", ba_name as bank, fk_place_id as "placeID" FROM BANK').catch((error) => {
        console.log(error);
        return new Error(error);
      });
    },

    getRoutingNumbers: (con, bank) => {
      return con.query('SELECT ro_id as "routingNumberID", ro_number as routingNumber FROM ROUTING_NUMBER, BANK WHERE fk_bank_id = ba_id AND ba_name = \''+bank+'\'').catch((error) => {
        console.log(error);
        return new Error(error);
      });
    }

/* ------------------------- POST -------------------------- */

/* -------------------------- PUT ---------------------------- */

/* ------------------------- DELETE -------------------------- */

}