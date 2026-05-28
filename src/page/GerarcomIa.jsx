import BtnAmarelo from "../componentes/BntAmarelo";
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
    <section>
      <MenuAzul />

      <div className="flex">
        <MenuLateral />

        <main className="flex justify-center w-full py-10">
          <div className="bg-gray-200 w-full max-w-[700px] p-8 rounded-md">
            {/* Título */}
            <div className="mb-6">
              <TextGraident
                Texto="Planejar Aula"
                TituloOuSubtitulo="titulo"
                tamanho={"30px"}
              />

              <TextGraident
                Texto="Crie planos de aula estruturados e personalizados"
                tamanho={"20px"}
                TituloOuSubtitulo="Subtitulo"
              />
            </div>

            {/* Card */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <TextHr
                TipoDeText={"Paragrafo"}
                largura={"270px"}
                text={"Informações da Aula"}
              />

              <div className="flex flex-col gap-5 mt-6">
                {/* Disciplina */}
                <div>
                  <Input
                    placeholder={"Digite a disciplina"}
                    {...register("disciplina", {
                      required: "A disciplina é obrigatória",
                    })}
                  />

                  {errors.disciplina && (
                    <span className="text-red-500 text-sm">
                      {errors.disciplina.message}
                    </span>
                  )}
                </div>

                {/* Série */}
                <div>
                  <Input
                    placeholder={"Digite a série da Turma"}
                    {...register("serie", {
                      required: "A série é obrigatória",
                    })}
                  />

                  {errors.serie && (
                    <span className="text-red-500 text-sm">
                      {errors.serie.message}
                    </span>
                  )}
                </div>

                {/* Tema */}
                <div>
                  <Input
                    placeholder={"Temas Da Aula"}
                    {...register("tema", {
                      required: "O tema é obrigatório",
                    })}
                  />

                  {errors.tema && (
                    <span className="text-red-500 text-sm">
                      {errors.tema.message}
                    </span>
                  )}
                </div>

                {/* Duração */}
                <div>
                  <Input
                    placeholder={"Digite a duração"}
                    {...register("duracao", {
                      required: "A duração é obrigatória",
                    })}
                  />

                  {errors.duracao && (
                    <span className="text-red-500 text-sm">
                      {errors.duracao.message}
                    </span>
                  )}
                </div>

                {/* Objetivos */}
                <div>
                  <label className="font-semibold">
                    Objetivos da Aprendizagem (opcional)
                  </label>

                  <textarea
                    placeholder="Descreva os objetivos que deseja alcançar..."
                    className="w-full p-3 rounded-lg bg-gray-100 mt-2 h-28 resize-none outline-none"
                    {...register("objetivos")}
                  />
                </div>

                <BtnAmarelo
                  children={"Gerar Plano de Aula"}
                  type="submit"
                />
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default GerarComIA;