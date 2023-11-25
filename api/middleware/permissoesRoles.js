const database = require("../models");
const Sequelize = require("sequelize");

/**
 *
 * valida permissoes do role/perfil do usuario
 *
 */

const permissoesRoles = (listaPermissoesAutorizadas) => {
  return async (req, res, next) => {
    const { usuarioId } = req;

    //1 buscar usuario e suas roles
    const usuario = await database.usuarios.findOne({
      include: [
        {
          model: database.roles,
          as: "usuario_roles",
          attributes: ["id", "nome"],
        },
      ],
      where: {
        id: usuarioId,
      },
    });

    if (!usuario) {
      return res.status(401).send("usuario não cadastrado");
    }
    //2 obter todos roles do usuario

    //todos os ids de perfil de usuario que o  usuario possui ( usuario pode ter mais de um perfil)
    let listaRolesIdDoUsuario = [];

    Object.values(usuario.usuario_roles).map((role) => {
      listaRolesIdDoUsuario.push(role.id);
    });

    if (listaRolesIdDoUsuario.length === 0) {
      return res.status(401).send("usuario nao possui acesso a essa rota");
    }

    // 3 obter permissoes das roles ( principal)
    const roles = await database.roles.findAll({
      include: [
        {
          model: database.permissoes,
          as: "roles_das_permissoes",
          attributes: ["id", "nome"],
        },
      ],
      where: {
        //obter roles e permissoes buscando por id das roles do usuario
        id: {
          [Sequelize.Op.in]: listaRolesIdDoUsuario,
        },
      },
    });

    //4 validar se role(perfil) possui permissao ( principal)

    //comeca que usuario n tem permissao
    let possuiPermissao = false;

    //faz comparacao das permissoes das roles do usuario com as permissoes passadas como autorizadas. Caso possua alguma muda possuiPermissao para true
    console.log(roles);
    roles.map((role) => {
      possuiPermissao = role.roles_das_permissoes
        .map((permissao) => permissao.nome)
        .some((permissao) => listaPermissoesAutorizadas.includes(permissao));
    });

    if (!possuiPermissao) {
      return res.status(401).send("usuario nao tem acesso a essa rota");
    }

    return next();
  };
};

module.exports = permissoesRoles;
