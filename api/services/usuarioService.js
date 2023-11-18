//acessa as model por meio da index de models
const database = require("../models");
//criptografar senha
const { hash } = require("bcryptjs");
//criar UUID
const uuid = require("uuid");

class UsuarioService {
  async obterUsuarios() {
    try {
      const usuarios = await database.usuarios.findAll({});

      return usuarios;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao obter usuarios");
    }
  }

  async obterUsuario(id) {
    try {
      const usuario = await database.usuarios.findOne({
        where: {
          id: id,
        },
      });

      if (usuario === null) {
        throw new Error("usuario nao encontrado");
      }
      return usuario;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao obter unico usuario");
    }
  }

  async cadastrar(dto) {
    try {
      //verifica se usuario ja esta cadastrado
      const usuario = await database.usuarios.findOne({
        where: {
          email: dto.email,
        },
      });

      if (usuario) {
        throw new Error("Usario ja cadastrado");
      }

      //criptografar senha
      const senhaHash = await hash(dto.senha, 8);

      //criar usuario com UUID e senha criptografada
      const novoUsuario = await database.usuarios.create({
        id: uuid.v4(), //criar UUID
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash,
      });

      return novoUsuario;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao tentar cadastrar usuario");
    }
  }

  async atualizarUsuario(id, dto) {
    try {
      //verifica se usuario ja esta cadastrado
      const usuario = await database.usuarios.findOne({
        where: {
          id: id,
        },
      });

      console.log("###", usuario);

      if (!usuario) {
        throw new Error("Usario não cadastrado");
      }

      usuario.nome = dto.nome;
      usuario.email = dto.email;

      await usuario.save();

      return usuario;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao tentar atualizar usuario");
    }
  }

  async deletarUsuario(id, dto) {
    try {
      //verifica se usuario ja esta cadastrado
      const usuario = await database.usuarios.destroy({
        where: {
          id: id,
        },
      });

      // if (!usuario) {
      //   throw new Error("Usario não cadastrado");
      // }

      return usuario;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao tentar atualizar usuario");
    }
  }
}

module.exports = UsuarioService;
