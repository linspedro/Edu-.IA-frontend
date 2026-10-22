
import { NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-50 text-blue-700"
        : "text-gray-600 hover:bg-gray-50 hover:text-blue-700"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-4 sm:px-8 md:flex-row">
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Ir para a página inicial"
          className="shrink-0 text-2xl font-bold tracking-tight text-blue-700 transition hover:text-blue-800 sm:text-3xl"
        >
          Edu+.IA
        </button>

        <nav aria-label="Navegação principal">
          <ul className="flex flex-wrap items-center justify-center gap-2">
            <li>
              <NavLink className={linkClass} to="/Gplano">
                Gerar com IA
              </NavLink>
            </li>

            <li>
              <NavLink className={linkClass} to="/Cplano">
                Criar manualmente
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <button
            type="button"
            onClick={() => navigate("/Login")}
            className="flex-1 rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-blue-700 sm:flex-none"
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={() => navigate("/Cadastro")}
            className="flex-1 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:flex-none"
          >
            Começar agora
          </button>
        </div>
      </div>
    </header>
  );
}
