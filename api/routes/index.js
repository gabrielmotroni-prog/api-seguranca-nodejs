const bodyParser = require("body-parser");

const produto = require("./produtoRoute");
const usuario = require("./usuarioRouter");
const auth = require("./authRouter");
const role = require("./roleRouter");

module.exports = (app) => {
  app.use(bodyParser.json(), auth, usuario, produto, role);
};
