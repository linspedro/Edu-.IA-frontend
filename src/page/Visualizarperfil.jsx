import BtnAzul from "../componentes/bntAzul";
import MenuAzul from "../componentes/MenuAzul";
import MenuLateral from "../componentes/menuLateral";
import TextGraident from "../componentes/textGraidient";


function VisualizarPerfil() {
  return (
    <section>
      <MenuAzul />

      <div className="flex min-h-[calc(100vh-112px)]">
        <MenuLateral />

        {/* Conteúdo principal */}
        <main className="flex-1 bg-[#F5F5F5] p-8">
          
          {/* Topo */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <TextGraident
                Texto="Meu Perfil"
                TituloOuSubtitulo="titulo"
                tamanho={"30px"}
              />

              <TextGraident
                Texto="Gerencie suas informações e acompanhe suas estatísticas"
                TituloOuSubtitulo="Subtitulo"
                tamanho={"20px"}
              />
            </div>

            <BtnAzul>Voltar</BtnAzul>
          </div>

          {/* Card Perfil */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 flex gap-3.5 ">
            <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center">P</div>
            <div>
            <h2 className="text-3xl font-bold mb-2">Professor</h2>
            <p className="text-gray-500">Professor</p>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Estatísticas</h2>

            <div className="grid grid-cols-3 gap-6">
              
              <div className="bg-blue-100 rounded-2xl p-6">
                <h3 className="text-5xl font-bold text-blue-700">3</h3>
                <p className="font-semibold mt-4">
                  Total de Planos
                </p>
                <span className="text-sm text-gray-500">
                  Criados até agora
                </span>
              </div>

              <div className="bg-purple-100 rounded-2xl p-6">
                <h3 className="text-5xl font-bold text-purple-700">2</h3>
                <p className="font-semibold mt-4">
                  Planos Manuais
                </p>
                <span className="text-sm text-gray-500">
                  Criados manualmente
                </span>
              </div>

              <div className="bg-yellow-100 rounded-2xl p-6">
                <h3 className="text-5xl font-bold text-yellow-700">1</h3>
                <p className="font-semibold mt-4">
                  Planos com IA
                </p>
                <span className="text-sm text-gray-500">
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

export default VisualizarPerfil