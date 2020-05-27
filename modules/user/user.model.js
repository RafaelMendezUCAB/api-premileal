const stripe = require('stripe')('sk_test_h4hCvDfHyNy9OKbPiV74EUGQ00jMw9jpyV');
const sendgrid = require('../../utils/emails/sendgrid');
const historicStatus = require('../hst_sta/historicStatus.model');
const place = require('../place/place.model');

async function changeUserToOnline(con, userID, userStatus){
  return await historicStatus.createUserStatus(con, userID, userStatus);
}

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

  login: async (con, email, password) => {
    var loginData = await con.query("SELECT u.u_id as \"userID\", u.u_name as name, u.u_lastname as \"lastName\", u.u_password as password, u.u_image as image, u.u_email as email, u.u_birthdate as birthdate, u.u_points as points, u.u_type as type, u.u_blocked as blocked, u.u_stripe_id as stripe_id, u.u_stripe_connect_id as stripe_connect_id, u_preferred_language as preferred_language, u.fk_role_id as \"roleID\", u.fk_place_id as \"placeID\", p_name as place, u.fk_level_id as \"levelID\", r_name as \"roleName\", r_description as \"roleDescription\", l_name as \"levelName\", l_percentage as \"levelPercentage\", l_bonus as \"levelBonus\" FROM USER_F u, ROLE, LEVEL, PLACE WHERE u.u_email = '"+email+"' and u.u_password = '"+password+"' and u.fk_role_id = r_id and r_name = 'client' and u.fk_level_id = l_id and p_id = u.fk_place_id").catch((error) => {
      return new Error(error);
    });
    
    if(loginData.length === 0){
      return "Users doesn't exists.";
    }
    else {
      console.log("user is: ", loginData)
      var statusCreated = await changeUserToOnline(con, loginData[0].userID, {
        statusID: 5
      });

      return loginData;
    }

  },

  socialLogin: async (con, email, type) => {
    var loginData = await con.query("SELECT u.u_id as \"userID\", u.u_name as name, u.u_lastname as \"lastName\", u.u_password as password, u.u_image as image, u.u_email as email, u.u_birthdate as birthdate, u.u_points as points, u.u_type as type, u.u_blocked as blocked, u.u_stripe_id as stripe_id, u.u_stripe_connect_id as stripe_connect_id, u_preferred_language as preferred_language, u.fk_role_id as \"roleID\", u.fk_place_id as \"placeID\", u.fk_level_id as \"levelID\", r_name as \"roleName\", r_description as \"roleDescription\", l_name as \"levelName\", l_percentage as \"levelPercentage\", l_bonus as \"levelBonus\" FROM USER_F u, ROLE, LEVEL WHERE u.u_email = '"+email+"' and u.u_type = '"+type+"' and u.fk_role_id = r_id and r_name = 'client' and u.fk_level_id = l_id").catch((error) => {
      return new Error(error);
    });

    if(loginData instanceof Array && loginData.length === 0){
      return "Social user doesn't exists.";
    }
    else {

      if(loginData[0].placeID !== null){
        var placeRetrieved = await place.getPlace(con, loginData[0].placeID);
        loginData[0].place = placeRetrieved[0].p_name;
      }

      var statusCreated = await changeUserToOnline(con, loginData[0].userID, {
        statusID: 5
      });

      return loginData;
    }
  },

/* ------------------------- POST -------------------------- */
  createUser: async (con, address, user) => {

    const userExists = await con.query("SELECT * FROM USER_F WHERE u_email = '"+user.email+"'").catch((error) => {
      return new Error(error);
    });

    if(userExists.length > 0){
      if(user.type === 'No Federado' || user.type !== userExists[0].u_type){
        return 'User email already exists.';
      }
      else {
        return await module.exports.socialLogin(con, user.email, user.type);
      }
    }
    else {
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
  
        const user_id = await con.query('INSERT INTO USER_F(u_name, u_lastName, u_password, u_image, u_email, u_birthdate, u_points, u_type, u_blocked, fk_role_id, fk_place_id, fk_level_id, u_stripe_id, u_stripe_connect_id) VALUES($1, $2, $3, $4, $5, $6, 0, $7, true, 1, $8, 1, $9, $10) RETURNING u_id',
        [user.name, user.lastName, user.password, user.image, user.email, user.birthdate !== "" ? user.birthdate : null, user.type, user.placeID !== "" ? user.placeID : null, customer.id, account.id]).catch((error) => {
          return new Error(error);
        });

        const email = await sendgrid.sendEmail({
          to: user.email,
          templateID: 'd-0f1639f66a1f465d990b22e494ed3239',  // Welcome template ID
          atributes : {
            name: user.name + ' ' + user.lastName
          }
        });

        if(user.type === 'No Federado'){
          return await module.exports.login(con, user.email, user.password);
        }
        else {
          return await module.exports.socialLogin(con, user.email, user.type);
        }
  
      } catch (error) {
        console.log(error);
        return new Error(error);
      }
    }        
  	
  },  

/* -------------------------- PUT ---------------------------- */
  updateUser: async (con, userID, user) => {

    const stripeUserDataUpdated = await stripe.customers.update(user.stripeID, {
      name: user.name + ' ' + user.lastName,
      email: user.email
    });

    const stripeConnectUserDataUpdated = await stripe.accounts.update(user.stripeConnectID, {
      individual: {
        first_name: user.name,
        last_name: user.lastName
      }
    });

    var updatedUser = await con.query('UPDATE USER_F SET u_name = $1, u_lastName = $2, u_password = $3, u_image = $4, u_email = $5, u_birthdate = $6, u_points = $7, u_type = $8, u_blocked = $9, fk_role_id = $10, fk_place_id = $11, fk_level_id = $12 WHERE u_id = $13',
  	[user.name, user.lastName, user.password, user.image, user.email, user.birthdate, user.points, user.type, user.blocked, user.roleID, user.placeID, user.levelID, userID]).catch((error) => {
      return new Error(error);
    });
    
    return "User successfully updated.";

  },

  updatePoints: async (con, userID, userPoints) => {
    const updatePoints = await con.query('UPDATE USER_F SET u_points = $1 WHERE u_id = $2',
    [userPoints.points, userID]).catch((error) => {
      return new Error(error);
    });
    
    return 'Points successfully updated.';
  },

  addPoints: async (con, userID, userPoints) => {
    const updatedPoints = await con.query("UPDATE USER_F SET u_points = u_points + "+userPoints.points+" WHERE u_id = "+userID).catch((error) => {
      return new Error(error);
    });

    return 'Points successfully updated.';
  },

  updateUserProfileImage: async (con, userID, image) => {
    console.log("image url: ", image.URL);
  	var imageUpdated = await con.query("UPDATE USER_F SET u_image = '"+image.URL+"' WHERE u_id = "+userID).catch((error) => {
      return new Error(error);
    });

    return 'Profile image successfully updated.';

  },

/* ------------------------- DELETE -------------------------- */
  deleteUser: (con, userID) => {
  	return con.query('DELETE FROM USER_F WHERE u_id = $1', [userID]).catch((error) => {
      return new Error(error);
    });
  },
};
