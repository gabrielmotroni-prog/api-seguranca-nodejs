const bodyParser = require("body-parser");

const produto = require("./produtoRoute");
const usuario = require("./usuarioRouter");
const auth = require("./authRouter");
const role = require("./roleRouter");
const permissoes = require("./permissoesRoute");

module.exports = (app) => {
  app.use(bodyParser.json(), auth, usuario, produto, role, permissoes);
};
