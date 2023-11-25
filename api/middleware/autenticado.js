const { verify, decode } = require("jsonwebtoken");

const jsonSecret = require("../config/jsonSecret");

/**
 * verifica autenticacao do usuario
 */

module.exports = async (req, res, next) => {
  //verifica existencia do token
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Access token não informado");
  }

  //obter hash do token
  const [, accesstoken] = token.split(" ");

  //validar secret e expiração
  try {
    //lanca excessao em dados incorretos
    verify(accesstoken, jsonSecret.secret);

    const { id, email } = await decode(accesstoken);

    req.usuarioId = id;
    req.usuarioEmail = email;

    return next();
  } catch (error) {
    return res.status(401).send("Usuario não autorizado");
  }
};
