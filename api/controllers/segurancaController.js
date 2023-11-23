const SegurancaService = require("../services/segurancaService");

const segurancaService = new SegurancaService();

class SegurancaController {
  static async cadastrarACL(req, res) {
    try {
      //array de roles e permissoes
      const { roles, permissoes } = req.body;

      //pegando ID do usuario direto da requisicao ( usuario logado)
      const { usuarioId } = req;

      try {
        const acl = await segurancaService.cadastrarACL({
          roles,
          permissoes,
          usuarioId,
        });

        res.status(201).json(acl);
      } catch (error) {
        res.status(400).send({ nmessage: error.message });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = SegurancaController;
