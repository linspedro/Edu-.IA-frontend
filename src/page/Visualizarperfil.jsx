
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import {
  BookOpen,
  CalendarDays,
  FileText,
  Target,
  FolderOpen,
  Sparkles,
  House,
  RefreshCw,
  ArrowRight,
  UserRound,
  GraduationCap,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

import BtnAzul from "../componentes/bntAzul";
import MenuAzul from "../componentes/MenuAzul";
import MenuLateral from "../componentes/menuLateral";
import TextGraident from "../componentes/textGraidient";

import { useAuth } from "../contexts/AuthContext";

import PlanejamentoApi from "../api/modelos/Planejamento";
import AulaApi from "../api/modelos/Aula";
import AtividadeApi from "../api/modelos/Atividade";

function CartaoEstatistica({
  titulo,
  valor,
  descricao,
  icone: Icone,
  cor = "hover:border-blue-200",
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${cor}`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {titulo}
          </p>

          <p className="mt-2 text-4xl font-bold text-gray-800">
            {valor}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-100">
          <Icone size={25} strokeWidth={1.8} />
        </div>
      </div>

      <p className="text-sm text-gray-500">{descricao}</p>

      <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-700">
        Ver na biblioteca
        <ArrowRight
          size={16}
          className="transition group-hover:translate-x-1"
        />
      </span>
    </button>
  );
}

function Atalho({ icone: Icone, titulo, descricao, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-start gap-4 rounded-xl border border-gray-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition group-hover:bg-blue-200">
        <Icone size={22} strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-gray-800">{titulo}</p>
        <p className="mt-1 text-sm text-gray-500">{descricao}</p>
      </div>

      <ArrowRight
        size={18}
        className="mt-1 shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
      />
    </button>
  );
}

function VisualizarPerfil() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [estatisticas, setEstatisticas] = useState({
    cronogramas: 0,
    aulas: 0,
    atividades: 0,
  });

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarEstatisticas() {
      if (!usuario?.id) {
        setCarregando(false);
        return;
      }

      setCarregando(true);
      setErro("");

      try {
        const resultados = await Promise.allSettled([
          PlanejamentoApi.listarPorUsuario(usuario.id),
          AulaApi.listarPorUsuario(usuario.id),
          AtividadeApi.listarPorUsuario(usuario.id),
        ]);

        if (!ativo) return;

        const [resPlanejamentos, resAulas, resAtividades] =
          resultados;

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

        const planejamentos = obterLista(resPlanejamentos);
        const aulas = obterLista(resAulas);
        const atividades = obterLista(resAtividades);

        setEstatisticas((anterior) => ({
          cronogramas:
            planejamentos?.length ?? anterior.cronogramas,
          aulas: aulas?.length ?? anterior.aulas,
          atividades:
            atividades?.length ?? anterior.atividades,
        }));

        if (
          planejamentos === null ||
          aulas === null ||
          atividades === null
        ) {
          setErro(
            "Algumas estatísticas não puderam ser carregadas. Tente atualizar."
          );
        }
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);

        if (ativo) {
          setErro("Não foi possível carregar as estatísticas.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarEstatisticas();

    return () => {
      ativo = false;
    };
  }, [usuario?.id]);

  const totalPlanos =
    estatisticas.cronogramas +
    estatisticas.aulas +
    estatisticas.atividades;

  const nome = usuario?.nome?.trim() || "Usuário";
  const inicial = nome.charAt(0).toUpperCase();

  function atualizarPagina() {
    window.location.reload();
  }

  return (
    <section className="min-h-screen bg-[#F4F7FB]">
      <MenuAzul Text="Meu Perfil" />

      <div className="flex min-h-[calc(100vh-112px)] flex-col md:flex-row">
        <MenuLateral />

        <main className="min-w-0 flex-1 p-4 md:p-8 lg:p-10">
          <div className="mx-auto max-w-6xl">
            {/* Cabeçalho */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <TextGraident
                  Texto="Meu Perfil"
                  TituloOuSubtitulo="titulo"
                  tamanho="text-3xl md:text-4xl"
                />

                <p className="mt-2 text-sm text-gray-500 md:text-base">
                  Gerencie suas informações e acompanhe suas
                  estatísticas no Edu+.IA.
                </p>
              </div>

              <BtnAzul onClick={() => navigate("/Principal")}>
                Voltar ao início
              </BtnAzul>
            </div>

            {/* Perfil */}
            <section className="mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="h-2 bg-gradient-to-r from-blue-800 via-blue-600 to-sky-300" />

              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 ring-4 ring-blue-50">
                  {usuario?.nome ? (
                    <span className="text-3xl font-bold">
                      {inicial}
                    </span>
                  ) : (
                    <UserRound size={34} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-blue-700">
                    Meu espaço
                  </p>

                  <h1 className="break-words text-2xl font-bold text-gray-800 md:text-3xl">
                    {nome}
                  </h1>

                  <div className="mt-2 flex items-center gap-2 text-gray-500">
                    <GraduationCap size={18} />
                    <p>Professor • Edu+.IA</p>
                  </div>
                </div>

                <div className="rounded-xl bg-blue-50 px-5 py-4 sm:min-w-36 sm:text-center">
                  <p className="text-sm text-gray-500">
                    Conteúdos criados
                  </p>

                  <p className="mt-1 text-3xl font-bold text-blue-700">
                    {carregando ? "—" : totalPlanos}
                  </p>
                </div>
              </div>
            </section>

            {/* Estatísticas */}
            <section className="mb-8">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                    <ChartNoAxesColumnIncreasing
                      size={25}
                      className="text-blue-700"
                    />
                    Suas estatísticas
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Resumo dos seus conteúdos pedagógicos.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={atualizarPagina}
                  disabled={carregando}
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCw
                    size={16}
                    className={carregando ? "animate-spin" : ""}
                  />
                  {carregando ? "Atualizando..." : "Atualizar"}
                </button>
              </div>

              {erro && (
                <div className="mb-5 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm">{erro}</p>

                  <button
                    type="button"
                    onClick={atualizarPagina}
                    className="shrink-0 text-left text-sm font-semibold underline"
                  >
                    Tentar novamente
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <CartaoEstatistica
                  titulo="Total de conteúdos"
                  valor={carregando ? "—" : totalPlanos}
                  descricao="Todos os conteúdos cadastrados"
                  icone={BookOpen}
                  cor="hover:border-blue-200"
                  onClick={() => navigate("/BibliotecaPrincipal")}
                />

                <CartaoEstatistica
                  titulo="Planejamentos"
                  valor={
                    carregando ? "—" : estatisticas.cronogramas
                  }
                  descricao="Planejamentos cadastrados"
                  icone={CalendarDays}
                  cor="hover:border-purple-200"
                  onClick={() => navigate("/BibliotecaPrincipal")}
                />

                <CartaoEstatistica
                  titulo="Planos de aula"
                  valor={carregando ? "—" : estatisticas.aulas}
                  descricao="Aulas salvas na biblioteca"
                  icone={FileText}
                  cor="hover:border-sky-200"
                  onClick={() => navigate("/BibliotecaPrincipal")}
                />

                <CartaoEstatistica
                  titulo="Atividades"
                  valor={
                    carregando ? "—" : estatisticas.atividades
                  }
                  descricao="Atividades salvas na biblioteca"
                  icone={Target}
                  cor="hover:border-amber-200"
                  onClick={() => navigate("/BibliotecaPrincipal")}
                />
              </div>
            </section>

            {/* Acesso rápido */}
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
              <h2 className="text-xl font-bold text-gray-800">
                Acesso rápido
              </h2>

              <p className="mb-5 mt-1 text-sm text-gray-500">
                Acesse as principais ferramentas da plataforma.
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Atalho
                  icone={FolderOpen}
                  titulo="Minha biblioteca"
                  descricao="Consulte seus conteúdos salvos."
                  onClick={() =>
                    navigate("/BibliotecaPrincipal")
                  }
                />

                <Atalho
                  icone={Sparkles}
                  titulo="Criar atividade"
                  descricao="Gere opções de atividades com IA."
                  onClick={() => navigate("/GerarAtividade")}
                />

                <Atalho
                  icone={House}
                  titulo="Página inicial"
                  descricao="Volte ao painel principal."
                  onClick={() => navigate("/Principal")}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </section>
  );
}

export default VisualizarPerfil;
