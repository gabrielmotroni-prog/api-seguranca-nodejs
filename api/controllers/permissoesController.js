const PermissaoService = require("../services/permissaoService");

const permissaoService = new PermissaoService();

class PermissaoController {
  static async cadastrarPermissao(req, res) {
    try {
      const { nome, descricao } = req.body;

      const permissao = await permissaoService.cadastrarPermissao({
        nome,
        descricao,
      });

      return res.status(201).json(permissao);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async buscarTodasPermissoes(req, res) {
    try {
      const permissao = await permissaoService.buscarTodasPermissao();

      return res.status(200).json(permissao);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async buscarPermissaoPorId(req, res) {
    try {
      const { id } = req.params;

      const permissao = await permissaoService.buscarpermissaoPorId(id);

      return res.status(201).json(permissao);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async editarPermissao(req, res) {
    try {
      const { id } = req.params;

      const { nome, descricao } = req.body;

      const permissao = await permissaoService.editarPermissao({
        id,
        nome,
        descricao,
      });

      return res.status(200).json(permissao);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async deletarPermissaoPorId(req, res) {
    try {
      const { id } = req.params;

      const permissao = await permissaoService.deletarPermissaoPorId(id);

      return res.status(200).json(permissao);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = PermissaoController;
