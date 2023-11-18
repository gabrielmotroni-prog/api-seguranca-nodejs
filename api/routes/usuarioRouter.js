const { Router } = require("express");
const UsuarioController = require("../controllers/usuarioController");

const router = Router();

router
  .post("/usuarios", UsuarioController.cadastrar)
  .get("/usuarios", UsuarioController.obterUsuarios)
  .get("/usuarios/id/:id", UsuarioController.obterUsuario)
  .put("/usuarios/id/:id", UsuarioController.atualizarUsuario)
  .delete("/usuarios/id/:id", UsuarioController.deletarUsuario);

module.exports = router;
