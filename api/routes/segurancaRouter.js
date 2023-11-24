const { Router } = require("express");
const SegurancaController = require("../controllers/segurancaController");

const router = Router();

router.post("/seguranca/acl", SegurancaController.cadastrarACL);
router.post(
  "/seguranca/permissoes-roles",
  SegurancaController.cadastrarPermissoesRoles
);

module.exports = router;
