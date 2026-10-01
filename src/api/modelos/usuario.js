
import http from "../http";

const usuariosAPI = {
  login: async (email, senha) => {
    try {
      const resposta = await http.post("/usuarios/login", {
        email: email,
        senha: senha,
      });
      return { data: resposta.data, status: resposta.status };
    } catch (erro) {

      return { data: erro.response.data, status: erro.response.status };
    }
  },

    cadastro: async (email,senha, nome) =>{
    try{
      const resposta = await http.post("/usuarios/criando_usuarios", {
        email:email,
        senha: senha,
        nome:nome,
      })
      return { data: resposta.data, status: resposta.status };
    }catch(erro){
       return { data: erro.response.data, status: erro.response.status };
    }
  }
};

export default usuariosAPI;
