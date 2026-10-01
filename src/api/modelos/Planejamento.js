import http from "../http";

const PlanejamentoApi = {
  criar: async (planejamento) => {
    try {
      const resposta = await http.post(
        "/Planejamento/criando_planejamento",
        planejamento,
      );
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return { data: error.response.data, status: error.response.status };
    }
  },
  listar: async () => {
    try {
      const resposta = await http.get("/Planejamento");
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return { data: error.response.data, status: error.response.status };
    }
  },
  buscar: async (id) => {
    try {
      const resposta = await http.get(`/Planejamento/${id}`);
      return { data: resposta.data, status: resposta.status };
    } catch (error) {
      return { data: error.response.data, status: error.response.status };
    }
  },

  // em cada um dos 3: Planejamento.js, Aula.js, Atividade.js
  listarPorUsuario: async (id_usuario) => {
  try {
    const resposta = await http.get(`/Planejamento/usuario/${id_usuario}`);
    return { data: resposta.data, status: resposta.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
},

deletar: async (id) => {
  try {
    const resposta = await http.delete(`/Planejamento/${id}`);
    return { data: resposta.data, status: resposta.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
},
};

export default PlanejamentoApi;
