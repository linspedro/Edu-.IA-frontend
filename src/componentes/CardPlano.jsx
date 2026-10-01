import { BookCopy, Eye, CalendarDays, Trash2 } from "lucide-react";
import BtnAzul from "./bntAzul";
import { useNavigate } from "react-router";

function CardPlano({ titulo, serie, data, navega, id, onExcluir }) {
  const navigate = useNavigate();

  function handleExcluir(e) {
    e.stopPropagation(); // evita acionar o clique do card por baixo, se houver
    const confirmar = window.confirm(`Tem certeza que deseja excluir "${titulo}"?`);
    if (confirmar) {
      onExcluir(id);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-amber-300 p-4 w-full max-w-sm shadow-sm relative">
      <button
        onClick={handleExcluir}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
        title="Excluir"
      >
        <Trash2 size={20} />
      </button>

      <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
        <BookCopy size={30} />
      </div>

      <h4 className="font-semibold text-base sm:text-lg break-words pr-6">{titulo}</h4>
      <p className="text-sm text-gray-600 break-words">{serie}</p>
      <p className="text-sm text-gray-500 mt-2 flex items-center gap-1.5">
        <CalendarDays size={18} />
        {data}
      </p>

      <div className="mt-4">
        <BtnAzul
          tamanho="w-full"
          icon={<Eye size={20} />}
          onClick={() => navigate(`${navega}/${id}`)}
        >
          Visualizar
        </BtnAzul>
      </div>
    </div>
  );
}

export default CardPlano;