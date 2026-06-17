import { BookCopy, Eye, CalendarDays } from "lucide-react";
import BtnAzul from "./bntAzul";
import { useNavigate } from "react-router";

function CardPlano({ titulo, serie, data, navega }) {
  const navigate = useNavigate();

  return (
    <div className="
      bg-white
      rounded-xl
      border border-amber-300
      p-4
      w-full
      max-w-sm
      shadow-sm
    ">
      {/* Ícone */}
      <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
        <BookCopy size={30} />
      </div>

      {/* Conteúdo */}
      <h4 className="font-semibold text-base sm:text-lg break-words">
        {titulo}
      </h4>

      <p className="text-sm text-gray-600 break-words">
        {serie}
      </p>

      <p className="text-sm text-gray-500 mt-2 flex items-center gap-1.5">
        <CalendarDays size={18} />
        {data}
      </p>

      {/* Botão */}
      <div className="mt-4">
        <BtnAzul
          tamanho="w-full"
          icon={<Eye size={20} />}
          onClick={() => navigate(navega)}
        >
          Visualizar
        </BtnAzul>
      </div>
    </div>
  );
}

export default CardPlano;