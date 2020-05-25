const app = require("./app");
const port = process.env.PORT;
const logger = require("./logger");
const nodeCron = require("./utils/nodecron/nodeCron");

//Servers starts listening
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
    nodeCron.initializeServices();
});
