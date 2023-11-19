const { Router } = require("express");
const UsuarioController = require("../controllers/usuarioController");
const autenticado = require("../services/middleware/autenticado");

const router = Router();

//midleware autenticacao
router.use(autenticado);

router
  .post("/usuarios", UsuarioController.cadastrar)
  .get("/usuarios", UsuarioController.obterUsuarios)
  .get("/usuarios/id/:id", UsuarioController.obterUsuario)
  .put("/usuarios/id/:id", UsuarioController.atualizarUsuario)
  .delete("/usuarios/id/:id", UsuarioController.deletarUsuario);

module.exports = router;
