export default function TextHr({
  text,
  TipoDeText,
  color = "#F5D553",
  largura = "w-32",
  CorDoParagrafo,
}) {
  if (TipoDeText === "Titulo") {
    return (
      <div>
        <h2
          style={{ color: CorDoParagrafo }}
          className="text-2xl sm:text-3xl font-poppins"
        >
          {text}
        </h2>

        <hr
          style={{ backgroundColor: color }}
          className={`${largura} h-[2px] border-none`}
        />
      </div>
    );
  }

  if (TipoDeText === "Paragrafo") {
    return (
      <div>
        <p
          style={{ color: CorDoParagrafo }}
          className="text-lg sm:text-xl font-poppins"
        >
          {text}
        </p>

        <hr
          style={{ backgroundColor: color }}
          className={`${largura} h-[2px] border-none`}
        />
      </div>
    );
  }

  return null;
}