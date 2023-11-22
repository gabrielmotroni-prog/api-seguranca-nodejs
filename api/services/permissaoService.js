const { v4: uuidv4 } = require("uuid");
const database = require("../models");

class PermissoeService {
  async cadastrarPermissao(dto) {
    const permissao = await database.permissoes.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (permissao) {
      throw new Error("permissao já cadastrado");
    }

    try {
      const newpermissao = await database.permissoes.create({
        id: uuidv4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });

      return newpermissao;
    } catch (error) {
      console.error("Erro ao cadastrar permissao: ", error.message);
      throw error;
    }
  }

  async buscarTodasPermissao() {
    try {
      const permissoes = await database.permissoes.findAll({});

      return permissoes;
    } catch (error) {
      throw new Error("Erro ao tentar obter lista de permissoes");
    }
  }

  async buscarpermissaoPorId(id) {
    const permissao = await database.permissoes.findOne({
      where: {
        id: id,
      },
    });

    if (!permissao) {
      throw new Error("permissao informado não cadastrado!");
    }

    return permissao;
  }

  async deletarPermissaoPorId(id) {
    const permissao = await database.permissoes.findOne({
      where: {
        id: id,
      },
    });

    if (!permissao) {
      throw new Error("permissao informado não cadastrado!");
    }

    try {
      await database.permissoes.destroy({
        where: {
          id: id,
        },
      });

      return "Permissão Deletada!";
    } catch (error) {
      throw new Error("Erro ao tentar apagar permissao");
    }
  }

  async editarPermissao(dto) {
    const permissao = await database.permissoes.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!permissao) {
      throw new Error("permissao informado não cadastrado!");
    }

    try {
      permissao.nome = dto.nome;
      permissao.descricao = dto.descricao;

      await permissao.save();

      return await permissao.reload();
    } catch (error) {
      throw new Error("Erro ao tentar editar permissao");
    }
  }
}

module.exports = PermissoeService;
