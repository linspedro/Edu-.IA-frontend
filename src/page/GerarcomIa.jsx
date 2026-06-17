import BtnAmarelo from "../componentes/BntAmarelo";
import BtnAzul from "../componentes/bntAzul";
import Input from "../componentes/input";
import MenuAzul from "../componentes/MenuAzul";
import MenuLateral from "../componentes/menuLateral";
import TextGraident from "../componentes/textGraidient";
import TextHr from "../componentes/textHr";
import { useForm } from "react-hook-form";

function GerarComIA() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Plano de aula gerado com sucesso!");
  };

  return (
    <section className="min-h-screen bg-[#ececec]">
      <MenuAzul Text={'Gerar com IA'}/>

      <div className="flex flex-col md:flex-row w-full">
        <MenuLateral />
        <div className="flex-1">
          <div className="flex">
            <div className="p-4 flex justify-between gap-2.5 p-4 ">
              <BtnAzul children={"Voltar"} />
              <BtnAmarelo children={'Anexar Cronograma'}/>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center py-6 px-4"
          >
            <TextGraident
              Texto="Planejar Aula com IA"
              TituloOuSubtitulo="titulo"
              tamanho="text-2xl md:text-4xl"
            />

            <div className="w-full max-w-4xl flex flex-col gap-6 mt-4">
              {/* INFORMAÇÕES PRINCIPAIS */}
              <div className="bg-white border border-zinc-300 rounded-xl p-4 md:p-6">
                <TextHr
                  CorDoParagrafo={"#2499F9"}
                  TipoDeText={"Paragrafo"}
                  largura={"290px"}
                  text={"Informações Principais"}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  <div>
                    <Input
                      placeholder="Disciplina"
                      {...register("disciplina", {
                        required: "Campo obrigatório",
                      })}
                    />
                    {errors.disciplina && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.disciplina.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      placeholder="Série/Turma"
                      {...register("serie", {
                        required: "Campo obrigatório",
                      })}
                    />
                    {errors.serie && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.serie.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      placeholder="Tema da Aula"
                      {...register("tema", {
                        required: "Campo obrigatório",
                      })}
                    />
                    {errors.tema && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.tema.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      placeholder="Duração"
                      {...register("duracao", {
                        required: "Campo obrigatório",
                      })}
                    />
                    {errors.duracao && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.duracao.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-5 mt-5">
                  <textarea
                    {...register("objetivos")}
                    placeholder="Objetivos da aula..."
                    className="w-full min-h-[120px] border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                  />

                  <textarea
                    {...register("habilidades")}
                    placeholder="Habilidades que deseja desenvolver..."
                    className="w-full min-h-[120px] border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                  />

                  <textarea
                    {...register("observacoes")}
                    placeholder="Observações para a IA..."
                    className="w-full min-h-[120px] border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                  />
                </div>
              </div>

              {/* PREFERÊNCIAS */}
              <div className="bg-white border border-zinc-300 rounded-xl p-4 md:p-6">
                <TextHr
                  CorDoParagrafo={"#2499F9"}
                  TipoDeText={"Paragrafo"}
                  largura={"250px"}
                  text={"Preferências da Aula"}
                />

                <div className="flex flex-col gap-5 mt-5">
                  <Input
                    placeholder="Metodologia desejada"
                    {...register("metodologia")}
                  />

                  <Input
                    placeholder="Quantidade de aulas"
                    type="number"
                    {...register("quantidadeAulas")}
                  />

                  <textarea
                    {...register("recursos")}
                    placeholder="Materiais ou recursos desejados..."
                    className="w-full min-h-[120px] border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                  />
                </div>
              </div>

              {/* BOTÃO */}
              <div className="w-full flex justify-center">
                <BtnAzul
                  type="submit"
                  children={"Gerar Plano com IA"}
                  tamanho="w-full md:w-72"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default GerarComIA;
