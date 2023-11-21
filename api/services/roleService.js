const { v4: uuidv4 } = require("uuid");
const database = require("../models");

class RoleService {
  async cadastrarRole(dto) {
    const role = await database.roles.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (role) {
      throw new Error("Role já cadastrado");
    }

    try {
      const newRole = await database.roles.create({
        id: uuidv4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });

      return newRole;
    } catch (error) {
      console.error("Erro ao cadastrar role: ", error.message);
      throw error;
    }
  }

  async buscarTodasRoles() {
    try {
      const roles = await database.roles.findAll({});

      return roles;
    } catch (error) {
      throw new Error("Erro ao tentar obter lista de roles");
    }
  }

  async buscarRolePorId(id) {
    const role = await database.roles.findOne({
      where: {
        id: id,
      },
    });

    if (!role) {
      throw new Error("Role informado não cadastrado!");
    }

    return role;
  }

  async deletarRolePorId(id) {
    const role = await database.roles.findOne({
      where: {
        id: id,
      },
    });

    if (!role) {
      throw new Error("Role informado não cadastrado!");
    }

    try {
      await database.roles.destroy({
        where: {
          id: id,
        },
      });

      return "Usuario Deletado!";
    } catch (error) {
      throw new Error("Erro ao tentar apagar role");
    }
  }

  async editarRole(dto) {
    const role = await database.roles.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!role) {
      throw new Error("Role informado não cadastrado!");
    }

    try {
      role.nome = dto.nome;
      role.descricao = dto.descricao;

      await role.save();

      return await role.reload();
    } catch (error) {
      throw new Error("Erro ao tentar editar role");
    }
  }
}

module.exports = RoleService;
