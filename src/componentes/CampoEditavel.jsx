export function exibirValor(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return "Não informado";
  }
  return String(valor);
}

// cartão pequeno (título, disciplina, turma, duração)
export function CartaoInfo({ rotulo, valor, editando, onChange }) {
  return (
    <div className="rounded-xl border bg-gray-50 p-4">
      <p className="text-sm text-gray-500">{rotulo}</p>

      {editando ? (
        <input
          value={valor ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-lg font-semibold outline-none focus:border-blue-400"
        />
      ) : (
        <p className="text-lg font-semibold">{exibirValor(valor)}</p>
      )}
    </div>
  );
}

// bloco de texto longo (objetivos, desenvolvimento, critérios...)
export function CampoTexto({ titulo, valor, editando, onChange }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-xl font-bold text-gray-800 md:text-2xl">
        {titulo}
      </h2>

      {editando ? (
        <textarea
          value={valor ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[160px] w-full rounded-xl border border-gray-300 bg-white p-4 leading-7 text-gray-700 outline-none focus:border-blue-400"
        />
      ) : (
        <div className="whitespace-pre-wrap break-words rounded-xl border border-gray-200 bg-gray-50 p-4 leading-7 text-gray-700">
          {exibirValor(valor)}
        </div>
      )}
    </section>
  );
}