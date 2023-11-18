const UsuarioService = require("../services/usuarioService");

const usuarioService = new UsuarioService();

class UsuarioController {
  static async obterUsuarios(req, res) {
    try {
      const usuario = await usuarioService.obterUsuarios();

      res.status(201).send(usuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async obterUsuario(req, res) {
    const { id } = req.params;

    try {
      const usuario = await usuarioService.obterUsuario(id);

      res.status(201).send(usuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      const usuario = await usuarioService.cadastrar({ nome, email, senha });

      res.status(201).send(usuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async atualizarUsuario(req, res) {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;

      const usuario = await usuarioService.atualizarUsuario(id, {
        nome,
        email,
      });

      res.status(201).send(usuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async deletarUsuario(req, res) {
    try {
      const { id } = req.params;

      const usuario = await usuarioService.deletarUsuario(id);

      res.status(201).send(usuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UsuarioController;
