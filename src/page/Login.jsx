import Input from "../componentes/input";
import { HeaderLogin } from "../componentes/headerLogin";
import BntAmarelo from "../componentes/BntAmarelo";
import EduaIA from "../assets/EduIA.png";
import { useNavigate } from "react-router";

function Login() {
  const navigation = useNavigate();


  return (
    <div className="bg-[#123D61]  flex justify-center items-center pt-[90px] font-[Poppins]">
      <HeaderLogin />

      <div className="bg-white w-[400px] min-h-[500px] rounded-xl p-10 flex flex-col justify-center gap-8 mb-[38px]">
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
        <form className="flex flex-col gap-5">
          <Input type="email" placeholder="Digite seu E-mail!" />
          <Input type="password" placeholder="Digite sua Senha!" />

          <div className="text-center text-sm">
            <a href="/login" className="text-[#2499F9] hover:underline">
              Já tem conta? Entre!
            </a>
          </div>

          <BntAmarelo
            children={"Entrar"}
            onClick={() => {
              navigation("/Principal");
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
