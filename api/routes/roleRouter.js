const { Router } = require("express");
const RoleController = require("../controllers/roleController");

const router = Router();

router.post("/roles", RoleController.cadastrar);
router.get("/roles", RoleController.buscarTodasRoles);
router.get("/roles/:id", RoleController.buscarRolePorId);
router.delete("/roles/:id", RoleController.deletarRolePorId);
router.put("/roles/:id", RoleController.editarRole);

module.exports = router;
