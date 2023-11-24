const SegurancaService = require("../services/segurancaService");

const segurancaService = new SegurancaService();

class SegurancaController {
  /**
   *
   * Permissoes de um usuario
   *
   */
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
  /**
   *
   * Permissoes de um perfil
   *
   */
  static async cadastrarPermissoesRoles(req, res) {
    try {
      //um perfil e um array de permissoes
      const { roleId, permissoes } = req.body;

      try {
        const permissoesRole = await segurancaService.cadastrarPermissoesRoles({
          roleId,
          permissoes,
        });

        res.status(201).json(permissoesRole);
      } catch (error) {
        res.status(400).send({ nmessage: error.message, stack: error.stack });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = SegurancaController;
