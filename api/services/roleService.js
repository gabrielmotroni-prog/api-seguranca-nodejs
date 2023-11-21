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

  //   async deletarProdutoPorId(id) {
  //     const produto = await database.produtos.findOne({
  //       where: {
  //         id: id,
  //       },
  //     });

  //     if (!produto) {
  //       throw new Error("Produto informado não cadastrado!");
  //     }

  //     try {
  //       await database.produtos.destroy({
  //         where: {
  //           id: id,
  //         },
  //       });
  //     } catch (error) {
  //       console.error("Message error: ", error.message);
  //       throw error;
  //     }
  //   }

  //   async editarProduto(dto) {
  //     const produto = await database.produtos.findOne({
  //       where: {
  //         id: dto.id,
  //       },
  //     });

  //     if (!produto) {
  //       throw new Error("Produto informado não cadastrado!");
  //     }

  //     try {
  //       produto.nome = dto.nome;
  //       produto.descricao = dto.descricao;
  //       produto.preco = dto.preco;

  //       await produto.save();

  //       return await produto.reload();
  //     } catch (error) {
  //       console.error("Message error: ", error.message);
  //       throw error;
  //     }
  //   }
}

module.exports = RoleService;
