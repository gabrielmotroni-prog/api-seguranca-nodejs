const { Router } = require("express");
const ProdutoController = require("../controllers/produtoController");

//valida roles/perfil
const roles = require("../middleware/roles");
const permissoes = require("../middleware/permissoes");
const permissoesRoles = require("../middleware/permissoesRoles");

const router = Router();

router
  .post("/produto", ProdutoController.cadastrarProduto)
  .get(
    "/produto",
    permissoesRoles(["Ler", "Atualizar"]),
    ProdutoController.buscarTodosProdutos
  )
  .get("/produto/id/:id", ProdutoController.buscarProdutoPorId)
  .delete("/produto/id/:id", ProdutoController.deletarProdutoPorId)
  .put("/produto/id/:id", ProdutoController.editarProduto);

module.exports = router;
