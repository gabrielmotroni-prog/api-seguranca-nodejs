const { Router } = require("express");
const PermissoesController = require("../controllers/permissoesController");

const router = Router();

router.post("/permissoes", PermissoesController.cadastrarPermissao);
router.get("/permissoes", PermissoesController.buscarTodasPermissoes);
router.get("/permissoes/:id", PermissoesController.buscarPermissaoPorId);
router.delete("/permissoes/:id", PermissoesController.deletarPermissaoPorId);
router.put("/permissoes/:id", PermissoesController.editarPermissao);

module.exports = router;
