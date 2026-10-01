import Input from "../componentes/input";
import { HeaderLogin } from "../componentes/headerLogin";
import BntAmarelo from "../componentes/BntAmarelo";
import EduaIA from "../assets/EduIA.png";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import usuariosAPI from "../api/modelos/usuario";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const navigation = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.Senha.length < 6) {
      setError("Senha", {
        type: "manual",
        message: "Senha deve ter pelo menos 6 caracteres",
      });

      return;
    }

    const resposta = await usuariosAPI.login(watch("Email"), watch("Senha"));


    if (resposta.status !== 200) {
      setError("Senha", {
        type: "manual",
        message: resposta.data.erro,
      });
    }

    if (resposta.status === 200) {
      login(resposta.data.usuario);
      navigation("/Principal");
    }
  };

  return (
    <div className="min-h-screen bg-[#123D61] flex justify-center items-center px-4 pt-24 pb-6 font-[Poppins]">
      <HeaderLogin />

      <div
        className="
          bg-white
          w-full
          max-w-md
          rounded-xl
          p-6
          md:p-10
          flex
          flex-col
          justify-center
          gap-6
          shadow-lg
        "
      >
        {/* Logo */}
        <div className="flex justify-center">
          <img src={EduaIA} alt="Edu+IA" className="w-24 md:w-32 h-auto" />
        </div>

        {/* Title */}
        <div className="flex flex-col items-center text-[#2499F9] text-center">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Bem-vindo ao Edu+
          </h1>
        </div>

        {/* Subtitle */}
        <div className="text-center bg-gradient-to-r from-[#DAE3FF] to-[#2499F9] bg-clip-text text-transparent text-base md:text-lg">
          Entrar na sua conta
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              type="email"
              placeholder="Digite seu E-mail!"
              largura="100%"
              {...register("Email", {
                required: "E-mail é obrigatório",
              })}
            />

            {errors.Email && (
              <span className="text-red-500 text-sm">
                {errors.Email.message}
              </span>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Digite sua Senha!"
              largura="100%"
              {...register("Senha", {
                required: "Senha é obrigatória",
              })}
            />

            {errors.Senha && (
              <span className="text-red-500 text-sm">
                {errors.Senha.message}
              </span>
            )}
          </div>

          <div className="text-center text-sm">
            <button
              type="button"
              className="text-[#2499F9] hover:underline"
              onClick={() => navigation("/Cadastro")}
            >
              Não tem conta? Cadastre-se
            </button>
          </div>

          <BntAmarelo children={"Entrar"} type="submit" tamanho="w-full" />
        </form>
      </div>
    </div>
  );
}

export default Login;
