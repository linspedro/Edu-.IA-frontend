import MenuAzul from "../componentes/MenuAzul";
import MenuLateral from "../componentes/menuLateral";
import TextHr from "../componentes/textHr";
import Input from "../componentes/input";
import TextGraident from "../componentes/textGraidient";
import BtnAmarelo from "../componentes/BntAmarelo";
import BtnAzul from "../componentes/bntAzul";

function CriarManualmente() {
  return (
    <section className="min-h-screen bg-[#ececec]">
      <MenuAzul />

      <div className="flex w-full">
        <MenuLateral />

        <div className="flex-1 flex flex-col items-center py-6 px-4">
          {/* <h2 className="w-full text-center text-4xl font-bold mb-6 text-blue-500">
            Planejar Aula
          </h2> */}

          <TextGraident Texto="Planejar aula " TituloOuSubtitulo="titulo" tamanho={'35px'}/>

          <div className="w-full max-w-4xl flex flex-col gap-6 mt-3.5">

            {/* INFORMAÇÕES PRINCIPAIS */}
            <div className="bg-white border border-zinc-300 rounded-[10px] p-6">
              <TextHr
                CorDoParagrafo={"#2499F9"}
                TipoDeText={"Paragrafo"}
                largura={"290px"}
                text={"Informações Principais"}
              />

              <div className="grid grid-cols-2 gap-5 mt-5">
                <Input
                  placeholder={"Ex: Janeiro/2026"}
                  type={"text"}
                  largura="100%"
                />

                <Input
                  placeholder={"Ex: 3º Ano A"}
                  type={"text"}
                  largura="100%"
                />

                <Input
                  placeholder={"Ex: Matemática"}
                  type={"text"}
                  largura="100%"
                />

                <Input
                  placeholder={"Ex: 1º Trimestre"}
                  type={"text"}
                  largura="100%"
                />
              </div>

              <div className="flex flex-col gap-5 mt-5">
                <textarea
                  placeholder="Descreva os componentes curriculares abordados..."
                  className="w-full h-32 border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                />

                <textarea
                  placeholder="Liste as habilidades a serem desenvolvidas..."
                  className="w-full h-32 border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                />

                <textarea
                  placeholder="Descreva os objetivos de conhecimento..."
                  className="w-full h-32 border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                />

                <Input
                  placeholder={"Quantidade De Aula Ex: 10"}
                  type={"number"}
                  largura="100%"
                />
              </div>
            </div>

            {/* PLANOS E ESTRATÉGIAS */}
            <div className="bg-white border border-zinc-300 rounded-[10px] p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-2xl font-semibold">
                  Planos e Estratégias
                </h3>

                <BtnAmarelo children={'+ Adicionar aula'}/>
              </div>

              <div className="text-center text-zinc-500 py-10">
                Nenhuma aula adicionada. Clique em "Adicionar Aula" para começar.
              </div>
            </div>

            {/* PROCESSO AVALIATIVO */}
            <div className="bg-white border border-zinc-300 rounded-[10px] p-6">
              <h3 className="text-2xl font-semibold mb-5">
                Processo Avaliativo
              </h3>

              <div className="flex flex-col gap-5">
                <textarea
                  placeholder="Ex: Provas, trabalhos em grupo, atividades práticas..."
                  className="w-full h-32 border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                />

                <Input
                  placeholder={"Ex: Formativa, somativa, diagnóstica..."}
                  type={"text"}
                  largura="100%"
                />

                <textarea
                  placeholder="Descreva os critérios de avaliação..."
                  className="w-full h-32 border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                />
              </div>
            </div>

            {/* MATERIAIS */}
            <div className="bg-white border border-zinc-300 rounded-[10px] p-6">
              <h3 className="text-2xl font-semibold mb-5">
                Materiais e Recursos
              </h3>

              <textarea
                placeholder="Liste os materiais e recursos necessários..."
                className="w-full h-32 border border-zinc-300 rounded-lg p-3 resize-none outline-none"
              />
            </div>

            {/* BOTÃO */}
            {/* <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              Salvar Plano
            </button> */}

            <BtnAzul children={'Salvar plano'} />

          </div>
        </div>
      </div>
    </section>
  );
}

export default CriarManualmente;