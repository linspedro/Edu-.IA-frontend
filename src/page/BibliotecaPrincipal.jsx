import { useState, useEffect } from "react";
import MenuLateral from "../componentes/menuLateral";
import MenuAzul from "../componentes/MenuAzul";
import Input from "../componentes/input";
import CardPlano from "../componentes/CardPlano";
import PlanejamentoApi from "../api/modelos/Planejamento";
import AulaApi from "../api/modelos/Aula";
import AtividadeApi from "../api/modelos/Atividade";
import { useAuth } from "../contexts/AuthContext";

function formatarData(dataISO) {
  const d = new Date(dataISO);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function BibliotecaPrincipal() {
  const { usuario } = useAuth();

  const [planosDeAula, setPlanosDeAula] = useState([]);
  const [cronogramas, setCronogramas] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function carregarDados() {
      // ainda sem filtro por usuário (temporário)
      const respostaAulas = await AulaApi.listar();
      if (respostaAulas.status === 200) {
        setPlanosDeAula(
          respostaAulas.data.map((aula) => ({
            id: aula.id_aula,
            titulo: aula.titulo_da_aula,
            serie: aula.turma,
            data: `${aula.materia} • Criado em ${formatarData(aula.data_criacao)}`,
            navega: "/VisualizarPlano",
          })),
        );
      }

      // já filtrado pelo usuário logado
      const respostaPlanejamentos = await PlanejamentoApi.listarPorUsuario(
        usuario.id,
      );
      if (respostaPlanejamentos.status === 200) {
        setCronogramas(
          respostaPlanejamentos.data.map((p) => ({
            id: p.id_planejamento,
            titulo: `${p.materia} - ${p.turma}`,
            serie: p.turma,
            data: `${p.periodo} • Criado em ${formatarData(p.data_criacao)}`,
            navega: "/VisualizarBibliotecao",
          })),
        );
      }

      // ainda sem filtro por usuário (temporário)
      const respostaAtividades = await AtividadeApi.listar();
      if (respostaAtividades.status === 200) {
        setAtividades(
          respostaAtividades.data.map((a) => ({
            id: a.id_atividade,
            titulo: a.titulo_da_atividade,
            serie: a.turma,
            data: `${a.materia} • Criado em ${formatarData(a.data_criacao)}`,
            navega: "/VisualizarAtividade",
          })),
        );
      }
    }

    carregarDados();
  }, [usuario.id]);

  const filtrar = (lista) =>
    lista.filter((item) =>
      item.titulo.toLowerCase().includes(busca.toLowerCase()),
    );

  async function excluirAula(id) {
    const resposta = await AulaApi.deletar(id);
    if (resposta.status === 204) {
      setPlanosDeAula((atual) => atual.filter((item) => item.id !== id));
    }
  }

  async function excluirPlanejamento(id) {
    const resposta = await PlanejamentoApi.deletar(id);
    if (resposta.status === 204) {
      setCronogramas((atual) => atual.filter((item) => item.id !== id));
    }
  }

  async function excluirAtividade(id) {
    const resposta = await AtividadeApi.deletar(id);
    if (resposta.status === 204) {
      setAtividades((atual) => atual.filter((item) => item.id !== id));
    }
  }

  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-white">
      <MenuLateral />

      <div className="flex flex-col flex-1 min-w-0">
        <MenuAzul Text="Biblioteca" />

        <div className="p-4 md:p-8 space-y-8">
          <div>
            <h2 className="text-3xl font-semibold">Biblioteca</h2>
            <p className="text-gray-600">
              Gerencie e visualize todos os seus planos de aula e cronogramas.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="w-full max-w-md">
              <Input
                placeholder="Buscar por título"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-5">Aulas Criadas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtrar(planosDeAula).map((item) => (
                <CardPlano key={item.id} {...item} onExcluir={excluirAula} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-5">Planejamento</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtrar(cronogramas).map((item) => (
                <CardPlano
                  key={item.id}
                  {...item}
                  onExcluir={excluirPlanejamento}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-5">Atividades</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtrar(atividades).map((item) => (
                <CardPlano
                  key={item.id}
                  {...item}
                  onExcluir={excluirAtividade}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BibliotecaPrincipal;