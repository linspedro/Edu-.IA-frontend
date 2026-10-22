
import { NavLink } from "react-router";

export function HeaderLogin() {
  return (
    <header className="fixed left-0 top-0 z-50 h-16 w-full border-b border-gray-200 bg-white sm:h-20">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-8">
        <NavLink
          to="/"
          end
          className="text-2xl font-bold tracking-tight text-blue-700 transition hover:text-blue-800 sm:text-3xl"
        >
          Edu+.IA
        </NavLink>

        <NavLink
          to="/"
          end
          className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-blue-50 hover:text-blue-700 sm:text-base"
        >
          Voltar
        </NavLink>
      </div>
    </header>
  );
}
