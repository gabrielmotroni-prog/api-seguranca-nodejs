const { Router } = require("express");
const RoleController = require("../controllers/roleController");

const router = Router();

router.post("/roles", RoleController.cadastrar);
router.get("/role");
router.get("/role/:id");
router.delete("/role/:id");
router.put("/role/:id");

module.exports = router;
