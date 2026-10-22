
import Input from "../componentes/input";
import { HeaderLogin } from "../componentes/headerLogin";
import BntAmarelo from "../componentes/BntAmarelo";
import EduaIA from "../assets/EduIA.png";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { LockKeyhole, ShieldCheck } from "lucide-react";

import usuariosAPI from "../api/modelos/usuario";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const navigation = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.Senha.length < 6) {
      setError("Senha", {
        type: "manual",
        message: "A senha deve ter pelo menos 6 caracteres.",
      });
      return;
    }

    try {
      const resposta = await usuariosAPI.login(data.Email, data.Senha);

      if (resposta.status !== 200) {
        setError("root", {
          type: "manual",
          message: resposta.data?.erro || "E-mail ou senha inválidos.",
        });
        return;
      }

      login(resposta.data.usuario);
      navigation("/Principal");
    } catch (error) {
      setError("root", {
        type: "manual",
        message:
          error.response?.data?.erro ||
          "Não foi possível entrar. Tente novamente.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 pb-8 pt-24 font-[Poppins]">
      <HeaderLogin />

      <main className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-md items-center justify-center">
        <section className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-9">
          {/* LOGO */}
          <div className="mb-6 flex justify-center">
            <img
              src={EduaIA}
              alt="Logo Edu+.IA"
              className="h-auto w-24 sm:w-28"
            />
          </div>

          {/* TÍTULO */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Bem-vindo ao Edu+.IA
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
              Entre na sua conta para continuar seu planejamento.
            </p>
          </div>

          {/* FORMULÁRIO */}
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="Email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                E-mail
              </label>

              <Input
                id="Email"
                type="email"
                placeholder="Digite seu e-mail"
                largura="100%"
                {...register("Email", {
                  required: "O e-mail é obrigatório.",
                })}
              />

              {errors.Email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.Email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="Senha"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Senha
              </label>

              <Input
                id="Senha"
                type="password"
                placeholder="Digite sua senha"
                largura="100%"
                {...register("Senha", {
                  required: "A senha é obrigatória.",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres.",
                  },
                })}
              />

              {errors.Senha && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.Senha.message}
                </p>
              )}
            </div>

            {/* ERRO DA API */}
            {errors.root && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {errors.root.message}
              </div>
            )}

            {/* CADASTRO */}
            <p className="text-center text-sm text-gray-600">
              Ainda não tem conta?{" "}
              <button
                type="button"
                className="font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                onClick={() => navigation("/Cadastro")}
              >
                Cadastre-se
              </button>
            </p>

            {/* BOTÃO */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LockKeyhole size={18} />
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* RODAPÉ DO CARD */}
          <div className="mt-6 flex items-center justify-center gap-2 border-t border-gray-100 pt-5 text-xs text-gray-400">
            <ShieldCheck size={15} />
            Acesse sua conta Edu+.IA
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
