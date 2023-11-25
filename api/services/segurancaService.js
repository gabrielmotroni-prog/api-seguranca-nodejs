const database = require("../models");
const Sequelize = require("sequelize");

class SegurancaService {
  async cadastrarACL(dto) {
    //1 buscar perfils ou permissao ja cadastrado do usuario
    const usuario = await database.usuarios.findOne({
      //retordo relacionamento dos dados sobre usuario
      include: [
        {
          model: database.roles,
          as: "usuario_roles",
          attributes: ["id", "nome", "descricao"],
        },
        {
          model: database.permissoes,
          as: "usuario_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
      where: {
        id: dto.usuarioId,
      },
    });

    if (!usuario) {
      throw new Error("usuário não cadastrado!");
    }

    //2 verificar se as ID de role e permissao informadas pelo usuario realmente existem
    const rolesCadastradas = await database.roles.findAll({
      where: {
        id: {
          //percorre lista de roles informada pelo usuario  e procura cada no bd
          [Sequelize.Op.in]: dto.roles,
        },
      },
    });

    const permissoesCadastradas = await database.permissoes.findAll({
      where: {
        id: {
          //percorre lista de permissoes informada pelo usuario e procura cada no bd
          [Sequelize.Op.in]: dto.permissoes,
        },
      },
    });

    //3 remove todos relacionamentos atuais do usuario para substituir por novos. O `as` ja inclui como novo atributo os metodos

    await usuario.removeUsuario_roles(usuario.usuario_roles);
    await usuario.removeUsuario_permissoes(usuario.usuario_permissoes);

    //4 dicionar os novos roles e permissoes validadas
    await usuario.addUsuario_roles(rolesCadastradas);
    await usuario.addUsuario_permissoes(permissoesCadastradas);

    //5 consulta novamente usuario com novos dados
    const novoUsuario = await database.usuarios.findOne({
      //retordo relacionamento dos dados sobre usuario
      include: [
        {
          model: database.roles,
          as: "usuario_roles",
          attributes: ["id", "nome", "descricao"],
        },
        {
          model: database.permissoes,
          as: "usuario_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
      where: {
        id: dto.usuarioId,
      },
    });

    return novoUsuario;
  }
  async cadastrarPermissoesRoles(dto) {
    //buscar se id da role é valido
    const role = await database.roles.findOne({
      include: [
        {
          model: database.permissoes,
          as: "roles_das_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
      where: {
        id: dto.roleId,
      },
    });

    if (!role) {
      throw new Error("Role não cadastrada");
    }

    //busca id das permissoes informadas validas
    const permissoesCadastradas = await database.permissoes.findAll({
      where: {
        //procura array de ids
        id: {
          [Sequelize.Op.in]: dto.permissoes,
        },
      },
    });

    //limpar lista de permissoes da role
    await role.removeRoles_das_permissoes(role.roles_das_permissoes);

    //atribui novas permissoes a role
    await role.addRoles_das_permissoes(permissoesCadastradas);

    //pesquisa role com novas permissoes
    const novaRole = await database.roles.findOne({
      include: [
        {
          model: database.permissoes,
          as: "roles_das_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
      where: {
        id: dto.roleId,
      },
    });
    return novaRole;
  }
}

module.exports = SegurancaService;
