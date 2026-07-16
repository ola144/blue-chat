const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const server = require("./app");
const dbConfig = require("./config/dbConfig");

const port = process.env.PORT;

server.listen(port, () => {
  console.log("Listening to requests on PORT: " + port);
});
