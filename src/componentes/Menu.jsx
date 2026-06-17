import { NavLink, useNavigate } from "react-router";

export default function Navbar({ font = "Poppins" }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b px-4 md:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <div>
          <h2
            className="
              text-2xl sm:text-3xl md:text-4xl
              font-bold
              bg-gradient-to-b
              from-blue-600
              to-white
              bg-clip-text
              text-transparent
              cursor-pointer
              text-center md:text-left
            "
            onClick={() => navigate("/")}
          >
            Edu+.IA
          </h2>

          <hr className="w-24 sm:w-36 mt-1.5 text-blue-400 mx-auto md:mx-0" />
        </div>

        {/* Menu */}
        <nav>
          <ul className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-center">
            <li>
              <NavLink
                style={{ fontFamily: font }}
                className="hover:opacity-70"
                to="/Gplano"
                end
              >
                G.Planos
              </NavLink>
            </li>

            <li>
              <NavLink
                style={{ fontFamily: font }}
                className="hover:opacity-70"
                to="/Cplano"
                end
              >
                C.Planos
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
          <button
            className="
              bg-amber-300
              text-white
              px-4 py-2
              rounded-lg
              hover:bg-blue-700
              transition
              w-full sm:w-auto
              cursor-pointer
            "
            onClick={() => navigate("/Cadastro")}
          >
            Começar Agora
          </button>

          <button
            className="
              text-base sm:text-xl
              hover:opacity-50
              cursor-pointer
            "
            onClick={() => navigate("/Login")}
          >
            Entrar
          </button>
        </div>

      </div>
    </header>
  );
}