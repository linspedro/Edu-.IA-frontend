import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Input from "../componentes/input";
import MenuAzul from "../componentes/MenuAzul";
import MenuLateral from "../componentes/menuLateral";
import TextGraident from "../componentes/textGraidient";
import TextHr from "../componentes/textHr";
import BtnAmarelo from "../componentes/BntAmarelo";
import BtnAzul from "../componentes/bntAzul";

function GerarAtividade() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dados da atividade:", data);
    alert("Atividade gerada com sucesso!");
  };

  return (
    <section className="min-h-screen bg-[#ececec]">
      <MenuAzul Text={"Atividades"} />

      <div className="flex flex-col md:flex-row w-full">
        <MenuLateral />

        <div className="flex-1">
          <div className="p-4">
            <BtnAzul
              children={"Voltar"}
              onClick={() => navigate(-1)}
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center py-6 px-4"
          >
            <TextGraident
              Texto="Planejar Atividade"
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
                      placeholder="Título da atividade"
                      {...register("titulo", {
                        required: "O título é obrigatório",
                      })}
                    />

                    {errors.titulo && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.titulo.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      placeholder="Disciplina"
                      {...register("disciplina", {
                        required: "A disciplina é obrigatória",
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
                      placeholder="Público-alvo (Ex: 6º Ano)"
                      {...register("publico", {
                        required: "O público-alvo é obrigatório",
                      })}
                    />

                    {errors.publico && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.publico.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      placeholder="Duração estimada"
                      {...register("duracao", {
                        required: "A duração é obrigatória",
                      })}
                    />

                    {errors.duracao && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.duracao.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* CONFIGURAÇÃO DA ATIVIDADE */}
              <div className="bg-white border border-zinc-300 rounded-xl p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-5">
                  <h3 className="text-xl md:text-2xl font-semibold">
                    Configuração da Atividade
                  </h3>

                  <BtnAmarelo
                    type="button"
                    children={"Anexar Material"}
                  />
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <Input
                      placeholder="Objetivo da atividade"
                      {...register("objetivo", {
                        required: "O objetivo é obrigatório",
                      })}
                    />

                    {errors.objetivo && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.objetivo.message}
                      </p>
                    )}
                  </div>

                  <textarea
                    {...register("descricao")}
                    placeholder="Descrição da atividade..."
                    className="w-full min-h-[120px] border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                  />

                  <textarea
                    {...register("observacoes")}
                    placeholder="Observações para a IA..."
                    className="w-full min-h-[120px] border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                  />
                </div>
              </div>

              {/* MATERIAIS E RECURSOS */}
              <div className="bg-white border border-zinc-300 rounded-xl p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-semibold mb-5">
                  Materiais e Recursos
                </h3>

                <textarea
                  {...register("materiais")}
                  placeholder="Materiais necessários..."
                  className="w-full min-h-[120px] border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                />
              </div>

              {/* BOTÃO FINAL */}
              <div className="w-full flex justify-center">
                <BtnAzul
                  type="submit"
                  children={"Gerar atividade"}
                  tamanho="w-full md:w-64"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default GerarAtividade;