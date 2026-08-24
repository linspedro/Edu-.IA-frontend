import MenuAzul from "../componentes/MenuAzul";
import MenuLateral from "../componentes/menuLateral";
import TextHr from "../componentes/textHr";
import Input from "../componentes/input";
import TextGraident from "../componentes/textGraidient";
import BtnAmarelo from "../componentes/BntAmarelo";
import BtnAzul from "../componentes/bntAzul";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";

function CriarManualmente() {
  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      aulas: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "aulas",
  });

  const onSubmit = (data) => {
    console.log("Plano criado:", data);

    alert("Plano salvo com sucesso!");

    console.log("Aulas:", data.aulas);
  };

  return (
    <section className="min-h-screen bg-[#ececec]">
      <MenuAzul Text={"Cronogramas"} />

      <div className="flex flex-col md:flex-row w-full">
        <MenuLateral />

        <div className="flex-1">
          {/* BOTÃO VOLTAR */}
          <div className="p-4">
            <BtnAzul
              children={"Voltar"}
              onClick={() => {
                navigate("/PlanejarPrincipal");
              }}
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center py-6 px-4"
          >
            <TextGraident
              Texto="Planejar aula"
              TituloOuSubtitulo="titulo"
              tamanho="text-2xl md:text-4xl"
            />

            <div className="w-full max-w-4xl flex flex-col gap-6 mt-4">
              
              {/* =========================================
                  INFORMAÇÕES PRINCIPAIS
              ========================================= */}
              <div className="bg-white border border-zinc-300 rounded-xl p-4 md:p-6">
                <TextHr
                  CorDoParagrafo={"#2499F9"}
                  TipoDeText={"Paragrafo"}
                  largura={"290px"}
                  text={"Informações Principais"}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  
                  <Input
                    {...register("periodo", {
                      required: true,
                    })}
                    placeholder="Ex: Janeiro/2026"
                  />

                  <Input
                    {...register("turma", {
                      required: true,
                    })}
                    placeholder="Ex: 3º Ano A"
                  />

                  <Input
                    {...register("disciplina", {
                      required: true,
                    })}
                    placeholder="Ex: Matemática"
                  />

                  <Input
                    {...register("trimestre", {
                      required: true,
                    })}
                    placeholder="Ex: 1º Trimestre"
                  />
                </div>

                <div className="flex flex-col gap-5 mt-5">
                  
                  <textarea
                    {...register("componentes")}
                    placeholder="Componentes curriculares..."
                    className="w-full min-h-[120px] border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                  />

                  <textarea
                    {...register("habilidades")}
                    placeholder="Habilidades..."
                    className="w-full min-h-[120px] border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                  />

                  <textarea
                    {...register("objetivos")}
                    placeholder="Objetivos..."
                    className="w-full min-h-[120px] border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                  />

                  <Input
                    {...register("quantidadeAulas", {
                      required: true,
                    })}
                    type="number"
                    placeholder="Quantidade de aulas"
                  />
                </div>
              </div>

              {/* =========================================
                  PLANOS E ESTRATÉGIAS
              ========================================= */}
              <div className="bg-white border border-zinc-300 rounded-xl p-4 md:p-6">
                
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-5">
                  
                  <h3 className="text-xl md:text-2xl font-semibold">
                    Planos e Estratégias
                  </h3>

                  <BtnAmarelo
                    type="button"
                    children="+ Adicionar aula"
                    onClick={() =>
                      append({
                        data: "",
                        encaminhamentoPedagogico: "",
                      })
                    }
                  />
                </div>

                {/* NENHUMA AULA */}
                {fields.length === 0 && (
                  <div className="text-center text-zinc-500 py-10">
                    Nenhuma aula adicionada.
                  </div>
                )}

                {/* AULAS */}
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="mb-4 border border-zinc-300 p-4 rounded-lg"
                  >
                    {/* NÚMERO DA AULA */}
                    <h4 className="font-semibold text-lg mb-4 text-blue-600">
                      Aula {index + 1}
                    </h4>

                    {/* DATA */}
                    <label className="block text-sm font-medium mb-2">
                      Data da aula
                    </label>

                    <Input
                      type="date"
                      {...register(`aulas.${index}.data`, {
                        required: true,
                      })}
                    />

                    {/* quantidade de aulas */}
                    <label className="block text-sm font-medium mt-4 mb-2">
                      Nome do conteudo
                    </label>

                    <textarea
                      placeholder="Ex: Química ecológica"
                      className="w-full min-h-[120px] border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                      {...register(
                        `aulas.${index}.encaminhamentoPedagogico`,
                        {
                          required: true,
                        }
                      )}
                    />

                    {/* REMOVER */}
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 text-sm mt-3 hover:underline"
                    >
                      Remover aula
                    </button>
                  </div>
                ))}
              </div>

              {/* =========================================
                  PROCESSO AVALIATIVO
              ========================================= */}
              <div className="bg-white border border-zinc-300 rounded-xl p-4 md:p-6">
                
                <h3 className="text-xl md:text-2xl font-semibold mb-5">
                  Processo Avaliativo
                </h3>

                <textarea
                  {...register("avaliacoes", {
                    required: true,
                  })}
                  placeholder="Provas, trabalhos..."
                  className="w-full min-h-[120px] border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                />

                <div className="mt-4">
                  <Input
                    {...register("tipoAvaliacao", {
                      required: true,
                    })}
                    placeholder="Formativa, somativa..."
                  />
                </div>

                <textarea
                  {...register("criterios", {
                    required: true,
                  })}
                  placeholder="Critérios..."
                  className="w-full min-h-[120px] border border-zinc-300 rounded-lg p-3 resize-none outline-none mt-4"
                />
              </div>

              {/* =========================================
                  MATERIAIS
              ========================================= */}
              <div className="bg-white border border-zinc-300 rounded-xl p-4 md:p-6">
                
                <h3 className="text-xl md:text-2xl font-semibold mb-5">
                  Materiais e Recursos
                </h3>

                <textarea
                  {...register("materiais", {
                    required: true,
                  })}
                  placeholder="Materiais necessários..."
                  className="w-full min-h-[120px] border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                />
              </div>

              {/* =========================================
                  BOTÃO FINAL
              ========================================= */}
              <div className="w-full flex justify-center">
                <BtnAzul
                  type="submit"
                  children={"Salvar Cronograma"}
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

export default CriarManualmente;