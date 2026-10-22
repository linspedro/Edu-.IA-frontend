
export default function Footer({
  companyName = "Edu+.IA",
  bottomText = "Todos os direitos reservados.",
}) {
  return (
    <footer className="mt-10 border-t border-gray-200 bg-white text-gray-600">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="text-2xl font-bold tracking-tight text-blue-700">
            {companyName}
            <span className="text-blue-400">.</span>
          </h2>

          <p className="text-center text-sm leading-6 text-gray-500 sm:text-right">
            Apoio inteligente para o planejamento docente.
          </p>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-5 text-center text-xs text-gray-400 sm:text-sm">
          {bottomText}
        </div>
      </div>
    </footer>
  );
}
