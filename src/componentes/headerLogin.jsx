import { NavLink } from "react-router";

export function HeaderLogin() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 sm:h-20 bg-gradient-to-r from-[#2876B5] to-[#2B5D9E] text-white z-50">
      <div className="max-w-[1200px] mx-auto px-4 h-full flex justify-between items-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold">
          Edu+.IA
        </h1>

        <NavLink
          className="text-base sm:text-xl md:text-2xl hover:opacity-70 transition"
          to="/"
          end
        >
          Voltar
        </NavLink>
      </div>
    </header>
  );
}