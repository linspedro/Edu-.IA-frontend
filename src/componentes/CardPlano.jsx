
import { BookCopy, Eye, CalendarDays, Trash2 } from "lucide-react";
import BtnAzul from "./bntAzul";
import { useNavigate } from "react-router";

function CardPlano({ titulo, serie, data, navega, id, onExcluir }) {
  const navigate = useNavigate();

  function handleExcluir(e) {
    e.stopPropagation();

    const confirmar = window.confirm(
      `Tem certeza que deseja excluir "${titulo}"?`
    );

    if (confirmar && onExcluir) {
      onExcluir(id);
    }
  }

  return (
    <article className="relative flex w-full max-w-sm flex-col rounded-2xl border border-gray-200 bg-white p-5 transition duration-200 hover:border-blue-300 hover:shadow-md">
      {/* EXCLUIR */}
      <button
        type="button"
        onClick={handleExcluir}
        className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
        title="Excluir plano"
        aria-label={`Excluir plano ${titulo}`}
      >
        <Trash2 size={19} />
      </button>

      {/* ÍCONE */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        <BookCopy size={25} strokeWidth={1.8} />
      </div>

      {/* INFORMAÇÕES */}
      <div className="flex-1">
        <h4 className="break-words pr-9 text-base font-bold leading-6 text-gray-900 sm:text-lg">
          {titulo}
        </h4>

        <p className="mt-1 break-words text-sm text-gray-500">
          {serie}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={17} className="shrink-0 text-blue-600" />
          <span>{data}</span>
        </div>
      </div>

      {/* VISUALIZAR */}
      <div className="mt-5 border-t border-gray-100 pt-4">
        <BtnAzul
          tamanho="w-full"
          icon={<Eye size={19} />}
          onClick={() => navigate(`${navega}/${id}`)}
        >
          Visualizar plano
        </BtnAzul>
      </div>
    </article>
  );
}

export default CardPlano;
