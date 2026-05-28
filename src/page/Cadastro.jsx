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
      <header className="w-full h-20 bg-gradient-to-r from-[#2d7ac5] to-[#3156b8] flex items-center justify-between px-5 md:px-[70px]">
        <HeaderLogin />
      </header>

      {/* CONTEÚDO */}
      <main className="flex-1 flex items-center justify-center p-5">
        <div className="w-[90%] max-w-[400px] bg-white rounded-[10px] flex flex-col items-center pt-8 px-5 pb-8">
          {/* LOGO */}
          <img src={EduaIA} alt="Logo" className="w-[104px] mb-[10px]" />

          {/* TITULO */}
          <h2 className="text-[#2499F9] text-[24px] md:text-[30px] leading-[36px] font-semibold mb-[10px]">
            Cadastro
          </h2>

          {/* TEXTO */}
          <p className="text-[15px] md:text-[18px] leading-[28px] text-center mb-5 bg-gradient-to-r from-[#DAE3FF] to-[#2499F9] bg-clip-text text-transparent">
            Crie sua conta para continuar
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center gap-[5px]"
          >
            <div className="w-full flex flex-col items-center">
              <input
                type="text"
                placeholder="Nome"
                className="w-[85%] max-w-[315px] h-10 bg-[#F5F5F5] border border-[#d1d5db] rounded-[8px] px-5 text-[16px] outline-none mb-1 placeholder:text-[14px] focus:placeholder:opacity-0 transition"
                {...register("Nome", {
                  required: "Nome é obrigatório",
                })}
              />

              {errors.Nome && (
                <span className="text-red-500 text-sm mb-3">
                  {errors.Nome.message}
                </span>
              )}
            </div>

            <div className="w-full flex flex-col items-center">
              <input
                type="email"
                placeholder="Email"
                className="w-[85%] max-w-[315px] h-10 bg-[#F5F5F5] border border-[#d1d5db] rounded-[8px] px-5 text-[16px] outline-none mb-1 placeholder:text-[14px] focus:placeholder:opacity-0 transition"
                {...register("Email", {
                  required: "Email é obrigatório",
                })}
              />

              {errors.Email && (
                <span className="text-red-500 text-sm mb-3">
                  {errors.Email.message}
                </span>
              )}
            </div>

            <div className="w-full flex flex-col items-center">
              <input
                type="password"
                placeholder="Senha"
                className="w-[85%] max-w-[315px] h-10 bg-[#F5F5F5] border border-[#d1d5db] rounded-[8px] px-5 text-[16px] outline-none mb-1 placeholder:text-[14px] focus:placeholder:opacity-0 transition"
                {...register("Senha", {
                  required: "Senha é obrigatória",
                })}
              />

              {errors.Senha && (
                <span className="text-red-500 text-sm mb-3">
                  {errors.Senha.message}
                </span>
              )}
            </div>

            <button
              type="button"
              className="text-[#3491ff] text-[14px] mb-10 hover:underline hover:text-[#b7d4fd] transition"
              onClick={() => navigate("/Login")}
            >
              Já possui conta?
            </button>

            {/* BOTÃO */}
            <BtnAzul
              children={"Entrar"}
              tamanho="250px"
              type="submit"
            />
          </form>
        </div>
      </main>
    </div>
  );
}