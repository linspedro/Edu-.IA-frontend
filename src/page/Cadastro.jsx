
import { useState } from "react";
import { HeaderLogin } from "../componentes/headerLogin";
import EduaIA from "../assets/EduIA.png";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { UserPlus, ShieldCheck } from "lucide-react";

import usuariosAPI from "../api/modelos/usuario";
import { useAuth } from "../contexts/AuthContext";

export default function Cadastro() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [enviando, setEnviando] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    setEnviando(true);

    try {
      const resposta = await usuariosAPI.cadastro(
        data.Email,
        data.Senha,
        data.Nome
      );

      if (resposta.status !== 201) {
        setError("root", {
          type: "manual",
          message:
            resposta.data?.erro || "Não foi possível criar sua conta.",
        });
        return;
      }

      login(resposta.data.usuario);
      navigate("/Principal");
    } catch (error) {
      setError("root", {
        type: "manual",
        message:
          error.response?.data?.erro ||
          "Ocorreu um erro ao cadastrar. Tente novamente.",
      });
    } finally {
      setEnviando(false);
    }
  };

  const campoClass =
    "h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-[Poppins]">
      <HeaderLogin />

      <main className="flex min-h-screen items-center justify-center px-4 pb-8 pt-24">
        <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-9">
          {/* LOGO */}
          <div className="mb-5 flex justify-center">
            <img
              src={EduaIA}
              alt="Logo Edu+.IA"
              className="h-auto w-24 sm:w-28"
            />
          </div>

          {/* TÍTULO */}
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Crie sua conta
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
              Comece a organizar seus planejamentos com o Edu+.IA.
            </p>
          </div>

          {/* FORMULÁRIO */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* NOME */}
            <div>
              <label
                htmlFor="Nome"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nome completo
              </label>

              <input
                id="Nome"
                type="text"
                autoComplete="name"
                placeholder="Digite seu nome"
                className={campoClass}
                {...register("Nome", {
                  required: "O nome é obrigatório.",
                  minLength: {
                    value: 2,
                    message: "Digite pelo menos 2 caracteres.",
                  },
                })}
              />

              {errors.Nome && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.Nome.message}
                </p>
              )}
            </div>

            {/* E-MAIL */}
            <div>
              <label
                htmlFor="Email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                E-mail
              </label>

              <input
                id="Email"
                type="email"
                autoComplete="email"
                placeholder="Digite seu e-mail"
                className={campoClass}
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

            {/* SENHA */}
            <div>
              <label
                htmlFor="Senha"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Senha
              </label>

              <input
                id="Senha"
                type="password"
                autoComplete="new-password"
                placeholder="Crie uma senha"
                className={campoClass}
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

              <p className="mt-2 text-xs text-gray-400">
                Utilize pelo menos 6 caracteres.
              </p>
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

            {/* LINK LOGIN */}
            <p className="text-center text-sm text-gray-600">
              Já possui uma conta?{" "}
              <button
                type="button"
                className="font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                onClick={() => navigate("/Login")}
              >
                Entrar
              </button>
            </p>

            {/* BOTÃO */}
            <button
              type="submit"
              disabled={enviando}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UserPlus size={18} />
              {enviando ? "Criando conta..." : "Criar minha conta"}
            </button>
          </form>

          {/* RODAPÉ */}
          <div className="mt-6 flex items-center justify-center gap-2 border-t border-gray-100 pt-5 text-xs text-gray-400">
            <ShieldCheck size={15} />
            Crie sua conta para acessar o Edu+.IA
          </div>
        </section>
      </main>
    </div>
  );
}
