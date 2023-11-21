const { Router } = require("express");
const RoleController = require("../controllers/roleController");

const router = Router();

router.post("/roles", RoleController.cadastrar);
router.get("/roles", RoleController.buscarTodasRoles);
router.get("/roles/:id");
router.delete("/roles/:id");
router.put("/roles/:id");

module.exports = router;
