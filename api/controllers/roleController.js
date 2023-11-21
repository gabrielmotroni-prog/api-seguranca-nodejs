const RoleService = require("../services/roleService");

const roleService = new RoleService();

class RoleController {
  static async cadastrar(req, res) {
    try {
      const { nome, descricao } = req.body;

      const role = await roleService.cadastrarRole({ nome, descricao });

      return res.status(201).json(role);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async buscarTodasRoles(req, res) {
    try {
      //const { nome, descricao } = req.body;

      const role = await roleService.buscarTodasRoles();

      return res.status(201).json(role);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async buscarRolePorId(req, res) {
    try {
      const { id } = req.params;

      const role = await roleService.buscarRolePorId(id);

      return res.status(201).json(role);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = RoleController;
