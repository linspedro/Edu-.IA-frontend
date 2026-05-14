import { BookCopy,Eye,CalendarDays } from "lucide-react";
import BtnAzul from "./bntAzul";
import { Navigate } from "react-router";
function CardPlano({ titulo, serie, data,navega }) {
    return (
        <div className="bg-white rounded-xl border border-amber-300 p-4 w-72 shadow-sm">
            
            {/* Ícone */}
            <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <BookCopy size={30}/>
            </div>

            {/* Conteúdo */}
            <h4 className="font-semibold text-lg">{titulo}</h4>
            <p className="text-sm text-gray-600">{serie}</p>
            <p className="text-sm text-gray-500 mt-2 flex gap-1.5"><CalendarDays size={20}/> {data}</p>

            {/* Botão */}
            {/* <button className="mt-4 w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer" >
                <Eye size={20}/> visualizar
            </button> */}
            <div className="mt-4 flex items-center justify-center ">
            <BtnAzul children={'Visualizar'} icon={<Eye size={20} onClick={() => {Navigate(navega)}}/>} />
            </div>
        </div>
    )
}

export default CardPlano