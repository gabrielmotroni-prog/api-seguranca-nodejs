const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const database = require("../models");
const jsonSecret = require("../config/jsonSecret");

class AuthService {
  async login(dto) {
    //bb
    const usuario = await database.usuarios.findOne({
      //devolver atributo senha explicito
      attributes: ["id", "email", "senha"],
      where: {
        email: dto.email,
      },
    });

    if (!usuario) {
      throw new Error("usuário não cadastrado!");
    }
    //compara senha digitada contra senha no bd
    const senhasIguais = await compare(dto.senha, usuario.senha);

    if (!senhasIguais) {
      //erro generico para proteção da api
      throw new Error("Usuario ou senha invalida!");
    }

    //gerar token em login com sucesso
    const acessToken = sign(
      {
        //paylod
        id: usuario.id,
        email: usuario.email,
      },
      //secret
      jsonSecret.secret,
      //options
      { expiresIn: 86400 }
    );

    return { acessToken };
  }
}

module.exports = AuthService;
