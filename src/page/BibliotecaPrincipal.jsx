import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import {
  Search,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Target,
  FolderOpen,
  RefreshCw,
  FileText,
  X,
  Library,
  AlertCircle,
} from "lucide-react";

import MenuLateral from "../componentes/menuLateral";
import MenuAzul from "../componentes/MenuAzul";
import Input from "../componentes/input";
import CardPlano from "../componentes/CardPlano";

import PlanejamentoApi from "../api/modelos/Planejamento";
import AulaApi from "../api/modelos/Aula";
import AtividadeApi from "../api/modelos/Atividade";

import { useAuth } from "../contexts/AuthContext";

// Formata a data para exibição no card.
function formatarData(dataISO) {
  if (!dataISO) return "Sem data";

  const data = new Date(dataISO);

  if (Number.isNaN(data.getTime())) return "Sem data";

  return data.toLocaleDateString("pt-BR");
}

// Converte a data para o formato usado pelo input type="date".
// Datas sem horário mantêm o dia original.
// Datas com horário são comparadas usando o dia local.
function normalizarDataFiltro(dataISO) {
  if (!dataISO) return "";

  const texto = String(dataISO);

  if (/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
    return texto;
  }

  const data = new Date(dataISO);

  if (Number.isNaN(data.getTime())) return "";

  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

// Confere se a resposta da API contém uma lista válida.
function obterLista(resultado) {
  if (
    resultado.status !== "fulfilled" ||
    !resultado.value ||
    resultado.value.status < 200 ||
    resultado.value.status >= 300
  ) {
    return null;
  }

  return Array.isArray(resultado.value.data)
    ? resultado.value.data
    : null;
}

function SecaoBiblioteca({
  titulo,
  descricao,
  icone: Icone,
  itens,
  carregando,
  onExcluir,
  mensagemVazia,
  filtroAtivo,
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <Icone size={23} strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <h3 className="text-xl font-bold text-gray-800 md:text-2xl">
            {titulo}
          </h3>

          <p className="text-sm text-gray-500">
            {descricao}
          </p>
        </div>

        <span className="ml-auto rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
          {itens.length}
        </span>
      </div>

      {carregando ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((numero) => (
            <div
              key={numero}
              className="h-44 animate-pulse rounded-2xl border border-gray-100 bg-gray-50"
            />
          ))}
        </div>
      ) : itens.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {itens.map((item) => (
            <CardPlano
              key={`${titulo}-${item.id}`}
              {...item}
              onExcluir={onExcluir}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-9 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <FolderOpen size={23} />
          </div>

          <p className="font-semibold text-gray-700">
            {mensagemVazia}
          </p>

          {filtroAtivo && (
            <p className="mt-1 text-sm text-gray-500">
              Tente alterar o título pesquisado ou escolher outra data.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function BibliotecaPrincipal() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [planosDeAula, setPlanosDeAula] = useState([]);
  const [cronogramas, setCronogramas] = useState([]);
  const [atividades, setAtividades] = useState([]);

  const [busca, setBusca] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [atualizando, setAtualizando] = useState(false);
  const [excluindo, setExcluindo] = useState(null);

  async function carregarDados(estaAtivo = () => true) {
    if (!usuario?.id) {
      if (estaAtivo()) setCarregando(false);
      return;
    }

    if (estaAtivo()) {
      setCarregando(true);
      setErro("");
    }

    try {
      const resultados = await Promise.allSettled([
        AulaApi.listarPorUsuario(usuario.id),
        PlanejamentoApi.listarPorUsuario(usuario.id),
        AtividadeApi.listarPorUsuario(usuario.id),
      ]);

      if (!estaAtivo()) return;

      const [resAulas, resPlanejamentos, resAtividades] =
        resultados;

      const aulas = obterLista(resAulas);
      const planejamentos = obterLista(resPlanejamentos);
      const listaAtividades = obterLista(resAtividades);

      if (aulas !== null) {
        setPlanosDeAula(
          aulas.map((aula) => ({
            id: aula.id_aula,
            titulo: aula.titulo_da_aula || "Aula sem título",
            serie: aula.turma || "",
            dataISO: aula.data_criacao || "",
            data: `${
              aula.materia || "Sem disciplina"
            } • Criado em ${formatarData(aula.data_criacao)}`,
            navega: `/VisualizarPlano/`,
          }))
        );
      }

      if (planejamentos !== null) {
        setCronogramas(
          planejamentos.map((planejamento) => ({
            id: planejamento.id_planejamento,
            titulo: `${planejamento.materia || "Sem disciplina"} - ${
              planejamento.turma || "Sem turma"
            }`,
            serie: planejamento.turma || "",
            dataISO: planejamento.data_criacao || "",
            data: `${
              planejamento.periodo || "Sem período"
            } • Criado em ${formatarData(
              planejamento.data_criacao
            )}`,
            navega: `/VisualizarBibliotecao/`,
          }))
        );
      }

      if (listaAtividades !== null) {
        setAtividades(
          listaAtividades.map((atividade) => ({
            id: atividade.id_atividade,
            titulo:
              atividade.titulo_da_atividade ||
              "Atividade sem título",
            serie: atividade.turma || "",
            dataISO: atividade.data_criacao || "",
            data: `${
              atividade.materia || "Sem disciplina"
            } • Criado em ${formatarData(
              atividade.data_criacao
            )}`,
            navega: `/VisualizarAtividade/`,
          }))
        );
      }

      if (
        aulas === null ||
        planejamentos === null ||
        listaAtividades === null
      ) {
        setErro(
          "Algumas seções não puderam ser carregadas. Verifique a conexão com o servidor."
        );
      }
    } catch (error) {
      console.error("Erro ao carregar biblioteca:", error);

      if (estaAtivo()) {
        setErro("Não foi possível carregar a biblioteca.");
      }
    } finally {
      if (estaAtivo()) {
        setCarregando(false);
        setAtualizando(false);
      }
    }
  }

  useEffect(() => {
    let ativo = true;

    carregarDados(() => ativo);

    return () => {
      ativo = false;
    };
  }, [usuario?.id]);

  async function atualizarBiblioteca() {
    setAtualizando(true);
    await carregarDados();
  }

  // Aplica a pesquisa por título e o filtro por dia simultaneamente.
  function filtrar(lista) {
    const termo = busca.trim().toLowerCase();

    return lista.filter((item) => {
      const correspondeBusca = String(item.titulo || "")
        .toLowerCase()
        .includes(termo);

      const dataItem = normalizarDataFiltro(item.dataISO);

      const correspondeData =
        !dataFiltro || dataItem === dataFiltro;

      return correspondeBusca && correspondeData;
    });
  }

  function limparFiltros() {
    setBusca("");
    setDataFiltro("");
  }

  async function excluirItem(tipo, id) {
    const configuracao = {
      aula: {
        api: AulaApi,
        atualizar: setPlanosDeAula,
        nome: "aula",
      },
      planejamento: {
        api: PlanejamentoApi,
        atualizar: setCronogramas,
        nome: "planejamento",
      },
      atividade: {
        api: AtividadeApi,
        atualizar: setAtividades,
        nome: "atividade",
      },
    }[tipo];

    if (!configuracao || excluindo !== null) return;

    const confirmar = window.confirm(
      `Tem certeza que deseja excluir este ${configuracao.nome}?`
    );

    if (!confirmar) return;

    setExcluindo(`${tipo}-${id}`);
    setErro("");

    try {
      const resposta = await configuracao.api.deletar(id);

      if (
        resposta.status === 200 ||
        resposta.status === 204
      ) {
        configuracao.atualizar((atual) =>
          atual.filter((item) => item.id !== id)
        );
      } else {
        setErro(
          resposta.data?.erro ||
            `Não foi possível excluir o ${configuracao.nome}.`
        );
      }
    } catch (error) {
      console.error(`Erro ao excluir ${tipo}:`, error);
      setErro(
        `Não foi possível excluir o ${configuracao.nome}.`
      );
    } finally {
      setExcluindo(null);
    }
  }

  const total =
    planosDeAula.length +
    cronogramas.length +
    atividades.length;

  const totalFiltrado =
    filtrar(planosDeAula).length +
    filtrar(cronogramas).length +
    filtrar(atividades).length;

  const filtroAtivo =
    busca.trim().length > 0 || Boolean(dataFiltro);

  return (
    <section className="flex min-h-screen flex-col bg-[#F4F7FB] md:flex-row">
      <MenuLateral />

      <div className="flex min-w-0 flex-1 flex-col">
        <MenuAzul Text="Biblioteca" />

        <main className="space-y-8 p-4 md:p-8 lg:p-10">
          {/* Cabeçalho */}
          <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800 md:text-4xl">
                <Library
                  size={32}
                  className="text-blue-700"
                />
                Minha biblioteca
              </h1>

              <p className="mt-2 text-gray-500">
                Organize, pesquise e acesse seus conteúdos pedagógicos.
              </p>
            </div>

            <button
              type="button"
              onClick={atualizarBiblioteca}
              disabled={carregando || atualizando}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-3 font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 disabled:opacity-50"
            >
              <RefreshCw
                size={18}
                className={
                  atualizando || carregando
                    ? "animate-spin"
                    : ""
                }
              />
              Atualizar
            </button>
          </header>

          {/* Resumo */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 p-5 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-blue-100">
                  Total de conteúdos
                </p>
                <BookOpen size={23} />
              </div>

              <p className="mt-3 text-4xl font-bold">
                {carregando ? "—" : total}
              </p>

              <p className="mt-2 text-sm text-blue-100">
                Conteúdos na sua biblioteca
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between text-gray-500">
                <p className="text-sm">Planos de aula</p>
                <FileText size={22} className="text-blue-700" />
              </div>

              <p className="mt-3 text-3xl font-bold text-gray-800">
                {carregando ? "—" : planosDeAula.length}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Aulas cadastradas
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between text-gray-500">
                <p className="text-sm">Atividades</p>
                <Target size={22} className="text-blue-700" />
              </div>

              <p className="mt-3 text-3xl font-bold text-gray-800">
                {carregando ? "—" : atividades.length}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Atividades salvas
              </p>
            </div>
          </section>

          {/* Pesquisa e filtros */}
          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:p-5">
            <div className="mb-4">
              <h2 className="font-semibold text-gray-800">
                Pesquisar e filtrar conteúdos
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Pesquise pelo título, selecione um dia ou combine os dois filtros.
              </p>
            </div>

            <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-[minmax(0,1fr)_220px_auto]">
              {/* Busca por título */}
              <div className="min-w-0">
                <label
                  htmlFor="busca-biblioteca"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Título do conteúdo
                </label>

                <div className="relative">
                  <Search
                    size={19}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <div className="[&_input]:w-full [&_input]:pl-10">
                    <Input
                      placeholder="Digite o título para pesquisar..."
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Filtro por dia */}
              <div>
                <label
                  htmlFor="filtro-data"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Dia de criação
                </label>

                <input
                  id="filtro-data"
                  type="date"
                  value={dataFiltro}
                  onChange={(e) => setDataFiltro(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Limpar filtros */}
              <button
                type="button"
                onClick={limparFiltros}
                disabled={!filtroAtivo}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <X size={17} />
                Limpar filtros
              </button>
            </div>

            {filtroAtivo && (
              <div className="mt-4 flex flex-col gap-1 border-t border-gray-100 pt-3 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  {busca.trim() && (
                    <>
                      Busca: <strong className="text-gray-700">{busca.trim()}</strong>
                    </>
                  )}

                  {busca.trim() && dataFiltro && " • "}

                  {dataFiltro && (
                    <>
                      Dia:{" "}
                      <strong className="text-gray-700">
                        {formatarData(`${dataFiltro}T12:00:00`)}
                      </strong>
                    </>
                  )}
                </p>

                <p>
                  {carregando
                    ? "Atualizando resultados..."
                    : `${totalFiltrado} resultado(s) encontrado(s)`}
                </p>
              </div>
            )}
          </section>

          {/* Mensagens de erro */}
          {erro && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
              <AlertCircle
                size={21}
                className="mt-0.5 shrink-0"
              />

              <div className="flex-1">
                <p className="font-semibold">Atenção</p>
                <p className="mt-1 text-sm">{erro}</p>
              </div>

              <button
                type="button"
                onClick={() => setErro("")}
                aria-label="Fechar mensagem"
                className="rounded-lg p-1 hover:bg-amber-100"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Conteúdo da biblioteca */}
          {!usuario?.id && !carregando ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <AlertCircle
                size={30}
                className="mx-auto mb-3 text-gray-400"
              />

              <h2 className="font-bold text-gray-800">
                Usuário não identificado
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Entre novamente na sua conta para acessar a biblioteca.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              <SecaoBiblioteca
                titulo="Aulas criadas"
                descricao="Seus planos de aula"
                icone={BookOpen}
                itens={filtrar(planosDeAula)}
                carregando={carregando}
                onExcluir={(id) => excluirItem("aula", id)}
                mensagemVazia={
                  filtroAtivo
                    ? "Nenhuma aula corresponde aos filtros."
                    : "Você ainda não possui aulas salvas."
                }
                filtroAtivo={filtroAtivo}
              />

              <SecaoBiblioteca
                titulo="Planejamentos"
                descricao="Seus planejamentos pedagógicos"
                icone={CalendarDays}
                itens={filtrar(cronogramas)}
                carregando={carregando}
                onExcluir={(id) =>
                  excluirItem("planejamento", id)
                }
                mensagemVazia={
                  filtroAtivo
                    ? "Nenhum planejamento corresponde aos filtros."
                    : "Você ainda não possui planejamentos salvos."
                }
                filtroAtivo={filtroAtivo}
              />

              <SecaoBiblioteca
                titulo="Atividades"
                descricao="Atividades criadas e salvas"
                icone={ClipboardList}
                itens={filtrar(atividades)}
                carregando={carregando}
                onExcluir={(id) =>
                  excluirItem("atividade", id)
                }
                mensagemVazia={
                  filtroAtivo
                    ? "Nenhuma atividade corresponde aos filtros."
                    : "Você ainda não possui atividades salvas."
                }
                filtroAtivo={filtroAtivo}
              />
            </div>
          )}

          {/* Rodapé */}
          {!carregando && usuario?.id && (
            <footer className="border-t border-gray-200 pt-5 text-center text-sm text-gray-500">
              {filtroAtivo
                ? `Exibindo ${totalFiltrado} de ${total} conteúdo(s) salvo(s).`
                : `Exibindo ${total} conteúdo(s) salvo(s) na biblioteca.`}
            </footer>
          )}
        </main>
      </div>
    </section>
  );
}

export default BibliotecaPrincipal;