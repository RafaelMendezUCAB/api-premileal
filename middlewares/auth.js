const jwt = require("jwt-simple");
const moment = require("moment");
const createError = require("http-errors");

function createToken(user) {
  const payload = {
    user_id: user,
    iat: moment(),
    exp: moment().add(1, "day"),
  };

  return jwt.encode(payload, process.env.SECRET_TOKEN);
}

function validateToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "Access denied." });
  }

  const token = req.headers.authorization.split(" ")[1];
  let payload = "";

  try {
    payload = jwt.decode(token, process.env.SECRET_TOKEN);
  } catch (error) {
    logger.error("Invalid Token.");
    next(createError(500, "Invalid Token."));
  }

  const tokenExp = new Date(payload.exp);
  const currentDate = new Date(moment());

  if (tokenExp <= currentDate) {
    return res.status(401).send({ message: "Token has expired." });
  }

  req.user_id = payload.user_id;
  next();
}

module.exports = { createToken, validateToken };
