import Input from "../componentes/input";
import { HeaderLogin } from "../componentes/headerLogin";
import BntAmarelo from "../componentes/BntAmarelo";
import EduaIA from "../assets/EduIA.png";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

function Login() {
  const navigation = useNavigate();

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

    navigation("/Principal");
  };

  return (
    <div className="bg-[#123D61] flex justify-center items-center pt-[90px] font-[Poppins] min-h-screen">
      <HeaderLogin />

      <div className="bg-white w-[400px] rounded-xl p-10 flex flex-col justify-center gap-8 mb-[38px]">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={EduaIA} className="w-[120px] h-[84px]" />
        </div>

        {/* Title */}
        <div className="flex flex-col items-center text-[#2499F9]">
          <h1 className="text-3xl font-semibold">Bem-vindo ao Edu+</h1>
        </div>

        {/* Subtitle */}
        <div className="text-center bg-gradient-to-r from-[#DAE3FF] to-[#2499F9] bg-clip-text text-transparent text-lg">
          Entrar na sua conta
        </div>

        {/* Form */}
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              type="email"
              placeholder="Digite seu E-mail!"
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
              Não tem conta? cadastre-se
            </button>
          </div>

          <BntAmarelo children={"Entrar"} type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Login;