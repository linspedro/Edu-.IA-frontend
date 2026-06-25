import BtnAzul from "../componentes/bntAzul";
import MenuAzul from "../componentes/MenuAzul";
import MenuLateral from "../componentes/menuLateral";
import TextGraident from "../componentes/textGraidient";
import { useNavigate } from "react-router";

function VisualizarPerfil() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#F5F5F5]">
      <MenuAzul Text={'Meu Perfil'}/>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-112px)]">
        <MenuLateral />

        {/* Conteúdo principal */}
        <main className="flex-1 p-4 md:p-8">

          {/* Topo */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">

            <div>
              <TextGraident
                Texto="Meu Perfil"
                TituloOuSubtitulo="titulo"
                tamanho={"text-[30px] md:30px"}
              />

              <TextGraident
                Texto="Gerencie suas informações e acompanhe suas estatísticas"
                TituloOuSubtitulo="Subtitulo"
                tamanho={"14px md:20px"}
              />
            </div>

            <div className="w-full md:w-auto flex justify-start md:justify-end">
              <BtnAzul onClick={() => navigate("/Principal")}>
                Voltar
              </BtnAzul>
            </div>

          </div>

          {/* Card Perfil */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm mb-8 flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
              P
            </div>

            <div>
              <h2 className="text-xl md:text-3xl font-bold mb-1">
                Professor
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                Professor
              </p>
            </div>

          </div>

          {/* Estatísticas */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">

            <h2 className="text-xl md:text-2xl font-bold mb-6">
              Estatísticas
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

              <div className="bg-blue-100 rounded-2xl p-4 md:p-6">
                <h3 className="text-3xl md:text-5xl font-bold text-blue-700">
                  3
                </h3>
                <p className="font-semibold mt-3 md:mt-4">
                  Total de Planos
                </p>
                <span className="text-xs md:text-sm text-gray-500">
                  Criados até agora
                </span>
              </div>

              <div className="bg-purple-100 rounded-2xl p-4 md:p-6">
                <h3 className="text-3xl md:text-5xl font-bold text-purple-700">
                  2
                </h3>
                <p className="font-semibold mt-3 md:mt-4">
                  Cronogramas
                </p>
                <span className="text-xs md:text-sm text-gray-500">
                  Criados manualmente
                </span>
              </div>

              <div className="bg-yellow-100 rounded-2xl p-4 md:p-6">
                <h3 className="text-3xl md:text-5xl font-bold text-yellow-700">
                  1
                </h3>
                <p className="font-semibold mt-3 md:mt-4">
                  Planos com IA
                </p>
                <span className="text-xs md:text-sm text-gray-500">
                  Gerados por IA
                </span>
              </div>

            </div>

          </div>

        </main>
      </div>
    </section>
  );
}

export default VisualizarPerfil;