import { useForm } from "react-hook-form";
import Input from "../componentes/input";
import MenuAzul from "../componentes/MenuAzul";
import MenuLateral from "../componentes/menuLateral";
import TextGraident from "../componentes/textGraidient";
import TextHr from "../componentes/textHr";
import BtnAmarelo from "../componentes/BntAmarelo";

function GerarAtividade() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dados da atividade:", data);

    // Aqui você pode chamar sua função/API para gerar a atividade
    alert("Atividade gerada com sucesso!");
  };

  return (
    <section className="flex min-h-screen">
      <MenuLateral />

      <div className="flex flex-col flex-1">
        <MenuAzul Text="Atividades" />

        <div className="p-8">
          <TextGraident
            TituloOuSubtitulo="titulo"
            Texto="Planejar Atividade"
          />

          <div className="mt-2">
            <TextHr
              text="Crie planos de atividade estruturados e personalizados."
              TipoDeText="Paragrafo"
              largura="350px"
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 bg-white rounded-xl shadow-md p-6 flex flex-col gap-4"
          >
            <Input
              placeholder="Título da atividade"
              {...register("titulo", {
                required: "O título é obrigatório",
              })}
            />
            {errors.titulo && (
              <p className="text-red-500 text-sm">
                {errors.titulo.message}
              </p>
            )}

            <Input
              placeholder="Disciplina"
              {...register("disciplina", {
                required: "A disciplina é obrigatória",
              })}
            />
            {errors.disciplina && (
              <p className="text-red-500 text-sm">
                {errors.disciplina.message}
              </p>
            )}

            <Input
              placeholder="Público-alvo (ex.: 6º ano)"
              {...register("publico", {
                required: "O público-alvo é obrigatório",
              })}
            />
            {errors.publico && (
              <p className="text-red-500 text-sm">
                {errors.publico.message}
              </p>
            )}

            <Input
              placeholder="Objetivo da atividade"
              {...register("objetivo", {
                required: "O objetivo é obrigatório",
              })}
            />
            {errors.objetivo && (
              <p className="text-red-500 text-sm">
                {errors.objetivo.message}
              </p>
            )}

            <Input
              placeholder="Duração estimada (ex.: 50 minutos)"
              {...register("duracao", {
                required: "A duração é obrigatória",
              })}
            />
            {errors.duracao && (
              <p className="text-red-500 text-sm">
                {errors.duracao.message}
              </p>
            )}

            <BtnAmarelo type="submit">
              Gerar Atividade
            </BtnAmarelo>
          </form>
        </div>
      </div>
    </section>
  );
}

export default GerarAtividade;