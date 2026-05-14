import { NavLink } from "react-router";
export function HeaderLogin() {

  return (
    <div className="fixed top-0 left-0 w-full h-[80px] bg-gradient-to-r from-[#2876B5] to-[#2B5D9E] text-white">
      <div className="max-w-[1200px] mx-auto  h-full flex justify-between items-center">
        <h1 className="text-5xl font-semibold ">Edu+.IA</h1>
        <NavLink className={"text-2xl  hover:opacity-70 transition"} to="/" end>
          Voltar
        </NavLink>
      </div>
    </div>
  );
}
