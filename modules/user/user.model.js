const stripe = require('stripe')('sk_test_h4hCvDfHyNy9OKbPiV74EUGQ00jMw9jpyV');

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

  login: (con, email, password) => {
    return con.query("SELECT u_id as \"userID\", u_name as name, u_lastname as \"lastName\", u_password as password, u_image as image, u_email as email, u_birthdate as birthdate, u_points as points, u_type as type, u_blocked as blocked, fk_role_id as \"roleID\", fk_place_id as \"placeID\", fk_level_id as \"levelID\", r_name as \"roleName\", r_description as \"roleDescription\", l_name as \"levelName\", l_percentage as \"levelPercentage\", l_bonus as \"levelBonus\" FROM USER_F, ROLE, LEVEL WHERE u_email = '"+email+"' and u_password = '"+password+"' and fk_role_id = r_id and r_name = 'client' and fk_level_id = l_id").catch((error) => {
      return new Error(error);
    });
  },

  socialLogin: (con, email, type) => {
    return con.query("SELECT u_id as \"userID\", u_name as name, u_lastname as \"lastName\", u_password as password, u_image as image, u_email as email, u_birthdate as birthdate, u_points as points, u_type as type, u_blocked as blocked, fk_role_id as \"roleID\", fk_place_id as \"placeID\", fk_level_id as \"levelID\", r_name as \"roleName\", r_description as \"roleDescription\", l_name as \"levelName\", l_percentage as \"levelPercentage\", l_bonus as \"levelBonus\" FROM USER_F, ROLE, LEVEL WHERE u_email = '"+email+"' and u_type = '"+type+"' and fk_role_id = r_id and r_name = 'client' and fk_level_id = l_id").catch((error) => {
      return new Error(error);
    });
  },

/* ------------------------- POST -------------------------- */
  createUser: async (con, address, user) => {

    try {
      const customer = await stripe.customers.create(
        {
          description: 'Customer.',
          email: user.email,
          name: user.name + ' ' + user.lastName
        }            
      );
    
      const account = await stripe.accounts.create(
        {              
          type: 'custom',
          country: 'US',
          requested_capabilities: [
            'transfers',
          ],
          business_type: 'individual',
          individual: {
            first_name: user.name,
            last_name: user.lastName
          },
          business_profile: {
            url: user.name + '.com'
        },
          metadata: {
            customer_id: customer.id
          }
        }        
      );

      const accountToS = await stripe.accounts.update(
          account.id,
          {
            tos_acceptance: {
              date: Math.floor(Date.now() / 1000),
              ip: address, // Assumes you're not using a proxy
            },
          }
      );

      return con.query('INSERT INTO USER_F(u_name, u_lastName, u_password, u_image, u_email, u_birthdate, u_points, u_type, u_blocked, fk_role_id, fk_place_id, fk_level_id, u_stripe_id, u_stripe_connect_id) VALUES($1, $2, $3, $4, $5, $6, 0, $7, true, 1, $8, 1, $9, $10)',
      [user.name, user.lastName, user.password, user.image, user.email, user.birthdate, user.type, user.placeID, customer.id, account.id]).catch((error) => {
        return new Error(error);
      });

    } catch (error) {
      return new Error(error);
    }
  	
  },

  registerUser: (con, user) => {
    return con
      .query(
        "INSERT INTO USER_F(u_name, u_lastName, u_password, u_image, u_email, u_birthdate, u_points, u_type, u_blocked, fk_role_id, fk_place_id, fk_level_id) VALUES('"+user.name +"', '"+user.lastName +"', '"+user.password +"', '"+user.image +"', '"+user.email+"', '"+user.birthdate +"', 0, '"+user.type+"', true, 1, "+user.placeID+", 1)"
      )
      .catch((error) => {
        return new Error(error);
      });
  },

/* -------------------------- PUT ---------------------------- */
  updateUser: (con, userID, user) => {
  	return con.query('UPDATE USER_F SET u_name = $1, u_lastName = $2, u_password = $3, u_image = $4, u_email = $5, u_birthdate = $6, u_points = $7, u_type = $8, u_blocked = $9, fk_role_id = $10, fk_place_id = $11, fk_level_id = $12 WHERE u_id = $13',
  	[user.name, user.lastName, user.password, user.image, user.email, user.birthdate, user.points, user.type, user.blocked, user.rolID, user.placeID, user.levelID, userID]).catch((error) => {
      return new Error(error);
    });
  },

  updatePoints: (con, userID, userPoints) => {
    return con.query('UPDATE USER_F SET u_points = $1 WHERE u_id = $2',
    [userPoints.points, userID]).catch((error) => {
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
