const database = require("../models");

const permissoes = (listaPermissoesAutorizadas) => {
  return async (req, res, next) => {
    const { usuarioId } = req;

    const usuario = await database.usuarios.findOne({
      include: [
        {
          model: database.permissoes,
          as: "usuario_permissoes",
          attributes: ["id", "nome"],
        },
      ],
      where: {
        id: usuarioId,
      },
    });

    // caso nao encontre usuario
    if (!usuario) {
      res.status(401).send("usuario não cadastrado");
    }

    // valida permissoes esperadas com a do usuario do token
    const validaPermissoes = usuario.usuario_permissoes
      .map((permissao) => permissao.nome)
      .some((permissao) => listaPermissoesAutorizadas.includes(permissao));

    if (!validaPermissoes) {
      res.status(401).send("usuario não possui acesso a essa rota");
    }

    next();
  };
};

module.exports = permissoes;
