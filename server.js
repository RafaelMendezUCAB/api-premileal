const app = require("./app");
const port = process.env.PORT;
const logger = require("./logger");

//Servers starts listening
app.listen(port, () => logger.info(`Server running on port ${port}`));
