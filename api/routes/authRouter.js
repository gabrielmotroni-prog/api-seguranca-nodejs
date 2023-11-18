const { Router } = require("express");
const AuthController = require("../controllers/authController");

const router = Router();

router.post("/auth/login", AuthController.login);
// .get("/usuarios", UsuarioController.obterUsuarios)
// .get("/usuarios/id/:id", UsuarioController.obterUsuario)
// .put("/usuarios/id/:id", UsuarioController.atualizarUsuario)
// .delete("/usuarios/id/:id", UsuarioController.deletarUsuario);

module.exports = router;
