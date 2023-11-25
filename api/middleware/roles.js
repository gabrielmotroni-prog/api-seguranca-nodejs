const database = require("../models");
/**
 * verifica perfil do usuario
 * valida se o usuario possui o perfil esperado para acessar a rota
 */

const roles = (listaRolesAutorizadas) => {
  return async (req, res, next) => {
    const { usuarioId } = req;

    //buscar pelo usuario informado
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

    //caso ocorra algum erro ou usuario foi apagado
    if (!usuario) {
      return res.status(401).send("usuario não cadastrado!");
    }

    // verifica se o usuario possui o nome da role correspondente com os nome de roles autorizados informados esperados
    const validaRoles = usuario.usuario_roles
      .map((role) => role.nome)
      .some((role) => listaRolesAutorizadas.includes(role));

    if (!validaRoles) {
      return res.status(401).send("usuario não possui acesso a esta rota");
    }

    next();
  };
};

module.exports = roles;

//some retorna true se possui alguma informacao igual
