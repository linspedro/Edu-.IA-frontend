import { NavLink } from "react-router";
import { useNavigate } from "react-router";

 export default function Navbar ({font = 'Poppins'}) {
     let navigate = useNavigate();
    return (
        <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
            <div className="">
              <h2 className="text-4xl font-bold bg-gradient-to-b from-blue-600 to-white bg-clip-text text-transparent cursor-pointer" onClick={() => {navigate('/')}}>Edu+.IA</h2>
              <hr className="w-36 mt-1.5 text-blue-400" />
            </div>

            <nav>
                <ul className="flex gap-4">
                    <li><NavLink style={{fontFamily: font}} className={"hover:opacity-70 cursor-pointer"} to="/Gplano" end>G.Planos</NavLink></li>
                    <li><NavLink style={{fontFamily: font}} className={"hover:opacity-70 cursor-pointer"} to="/Cplano" end>C.Planos</NavLink></li>
                </ul>
            </nav>

            <div className="flex gap-4">
                <input type="button" value="Começar Agora" className="bg-amber-300 text-white px-4 py-2 rounded-lg border-b-blue-500 border-solid hover:bg-blue-700 transition cursor-pointer" />
                <input type="button" value="Entrar" className="text-2xl  hover:rounded-lg hover:opacity-50 cursor-pointer" onClick={() => {navigate('/Login')}}/>
            </div>
        </header>
    )
}
