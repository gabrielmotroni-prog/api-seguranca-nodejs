const { Router } = require("express");
const SegurancaController = require("../controllers/segurancaController");

const router = Router();

router.post("/seguranca/acl", SegurancaController.cadastrarACL);
// .get("/usuarios", UsuarioController.obterUsuarios)
// .get("/usuarios/id/:id", UsuarioController.obterUsuario)
// .put("/usuarios/id/:id", UsuarioController.atualizarUsuario)
// .delete("/usuarios/id/:id", UsuarioController.deletarUsuario);

module.exports = router;
