import MenuAzul from "../componentes/MenuAzul";
import MenuLateral from "../componentes/menuLateral";
import TextHr from "../componentes/textHr";
import Input from "../componentes/input";
import TextGraident from "../componentes/textGraidient";
import BtnAmarelo from "../componentes/BntAmarelo";
import BtnAzul from "../componentes/bntAzul";
import { useForm, useFieldArray } from "react-hook-form";

function CriarManualmente() {
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
  };

  return (
    <section className="min-h-screen bg-[#ececec]">
      <MenuAzul />

      <div className="flex w-full">
        <MenuLateral />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col items-center py-6 px-4"
        >
          <TextGraident
            Texto="Planejar aula"
            TituloOuSubtitulo="titulo"
            tamanho={"35px"}
          />

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
                <Input {...register("periodo", { required: true })} placeholder="Ex: Janeiro/2026" />
                <Input {...register("turma", { required: true })} placeholder="Ex: 3º Ano A" />
                <Input {...register("disciplina", { required: true })} placeholder="Ex: Matemática" />
                <Input {...register("trimestre", { required: true })} placeholder="Ex: 1º Trimestre" />
              </div>

              <div className="flex flex-col gap-5 mt-5">
                <textarea
                  {...register("componentes")}
                  placeholder="Componentes curriculares..."
                  className="w-full h-32 border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                />

                <textarea
                  {...register("habilidades")}
                  placeholder="Habilidades..."
                  className="w-full h-32 border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                />

                <textarea
                  {...register("objetivos")}
                  placeholder="Objetivos..."
                  className="w-full h-32 border border-zinc-300 rounded-lg p-3 resize-none outline-none"
                />

                <Input
                  {...register("quantidadeAulas", { required: true })}
                  type="number"
                  placeholder="Quantidade de aulas"
                />
              </div>
            </div>

            {/* PLANOS E ESTRATÉGIAS */}
            <div className="bg-white border border-zinc-300 rounded-[10px] p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-2xl font-semibold">
                  Planos e Estratégias
                </h3>

                <BtnAmarelo
                  type="button"
                  children="+ Adicionar aula"
                  onClick={() =>
                    append({ titulo: "", descricao: "" })
                  }
                />
              </div>

              {fields.length === 0 && (
                <div className="text-center text-zinc-500 py-10">
                  Nenhuma aula adicionada.
                </div>
              )}

              {fields.map((item, index) => (
                <div key={item.id} className="mb-4 border p-3 rounded">
                  <Input
                    placeholder="Título da aula"
                    {...register(`aulas.${index}.titulo`, { required: true })}
                  />

                  <textarea
                    placeholder="Descrição da aula"
                    className="w-full mt-2 p-3 border rounded-lg"
                    {...register(`aulas.${index}.descricao`, { required: true })}
                  />

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            {/* AVALIAÇÃO */}
            <div className="bg-white border border-zinc-300 rounded-[10px] p-6">
              <h3 className="text-2xl font-semibold mb-5">
                Processo Avaliativo
              </h3>

              <textarea
                {...register("avaliacoes", { required: true })}
                placeholder="Provas, trabalhos..."
                className="w-full h-32 border border-zinc-300 rounded-lg p-3 resize-none outline-none"
              />

              <Input
                {...register("tipoAvaliacao", { required: true })}
                placeholder="Formativa, somativa..."
              />

              <textarea
                {...register("criterios", { required: true })}
                placeholder="Critérios..."
                className="w-full h-32 border border-zinc-300 rounded-lg p-3 resize-none outline-none"
              />
            </div>

            {/* MATERIAIS */}
            <div className="bg-white border border-zinc-300 rounded-[10px] p-6">
              <h3 className="text-2xl font-semibold mb-5">
                Materiais e Recursos
              </h3>

              <textarea
                {...register("materiais", { required: true })}
                placeholder="Materiais necessários..."
                className="w-full h-32 border border-zinc-300 rounded-lg p-3 resize-none outline-none"
              />
            </div>

            {/* BOTÃO FINAL */}
            <BtnAzul type="submit" children={"Salvar plano"} />
          </div>
        </form>
      </div>
    </section>
  );
}

export default CriarManualmente;