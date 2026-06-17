import { HeaderLogin } from "../componentes/headerLogin";
import EduaIA from "../assets/EduIA.png";
import BtnAzul from "../componentes/bntAzul";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

export default function Cadastro() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    if (data.Senha.length < 6) {
      setError("Senha", {
        type: "manual",
        message: "Senha deve ter pelo menos 6 caracteres",
      });

      return;
    }

    navigate("/Principal");
  };

  return (
    <div className="w-full min-h-screen bg-[#123d66] flex flex-col font-[Poppins]">
      {/* MENU */}
      <HeaderLogin />

      {/* CONTEÚDO */}
      <main className="flex-1 flex items-center justify-center p-4 pt-24">
        <div
          className="
            w-full
            max-w-md
            bg-white
            rounded-xl
            shadow-lg
            flex
            flex-col
            items-center
            pt-8
            px-4
            sm:px-6
            pb-8
          "
        >
          {/* LOGO */}
          <img
            src={EduaIA}
            alt="Logo"
            className="w-20 sm:w-24 md:w-28 mb-3"
          />

          {/* TÍTULO */}
          <h2 className="text-[#2499F9] text-2xl md:text-3xl font-semibold mb-2">
            Cadastro
          </h2>

          {/* TEXTO */}
          <p
            className="
              text-sm
              sm:text-base
              text-center
              mb-5
              bg-gradient-to-r
              from-[#DAE3FF]
              to-[#2499F9]
              bg-clip-text
              text-transparent
            "
          >
            Crie sua conta para continuar
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-2"
          >
            {/* Nome */}
            <div className="w-full flex flex-col">
              <input
                type="text"
                placeholder="Nome"
                className="
                  w-full
                  h-11
                  bg-[#F5F5F5]
                  border
                  border-[#d1d5db]
                  rounded-lg
                  px-4
                  text-base
                  outline-none
                  focus:placeholder:opacity-0
                  transition
                "
                {...register("Nome", {
                  required: "Nome é obrigatório",
                })}
              />

              {errors.Nome && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.Nome.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="w-full flex flex-col">
              <input
                type="email"
                placeholder="Email"
                className="
                  w-full
                  h-11
                  bg-[#F5F5F5]
                  border
                  border-[#d1d5db]
                  rounded-lg
                  px-4
                  text-base
                  outline-none
                  focus:placeholder:opacity-0
                  transition
                "
                {...register("Email", {
                  required: "Email é obrigatório",
                })}
              />

              {errors.Email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.Email.message}
                </span>
              )}
            </div>

            {/* Senha */}
            <div className="w-full flex flex-col">
              <input
                type="password"
                placeholder="Senha"
                className="
                  w-full
                  h-11
                  bg-[#F5F5F5]
                  border
                  border-[#d1d5db]
                  rounded-lg
                  px-4
                  text-base
                  outline-none
                  focus:placeholder:opacity-0
                  transition
                "
                {...register("Senha", {
                  required: "Senha é obrigatória",
                })}
              />

              {errors.Senha && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.Senha.message}
                </span>
              )}
            </div>

            {/* Link Login */}
            <button
              type="button"
              className="
                text-[#3491ff]
                text-sm
                mt-2
                mb-6
                hover:underline
                hover:text-[#b7d4fd]
                transition
              "
              onClick={() => navigate("/Login")}
            >
              Já possui conta?
            </button>

            {/* Botão */}
            <BtnAzul
              children="Entrar"
              tamanho="w-full"
              type="submit"
            />
          </form>
        </div>
      </main>
    </div>
  );
}