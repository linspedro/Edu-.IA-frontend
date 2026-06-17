import "../index.css";

export default function TextGraident({
  Texto,
  TituloOuSubtitulo,
  tamanho = "text-2xl sm:text-4xl",
}) {
  if (TituloOuSubtitulo === "titulo") {
    return (
      <h1
        className={`gradient-text ${tamanho} font-poppins`}
      >
        {Texto}
      </h1>
    );
  }

  if (TituloOuSubtitulo === "Subtitulo") {
    return (
      <p
        className={`gradient-text ${tamanho} font-poppins`}
      >
        {Texto}
      </p>
    );
  }

  return <>{Texto}</>;
}