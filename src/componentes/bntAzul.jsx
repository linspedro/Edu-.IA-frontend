export default function BtnAzul({
  children,
  icon,
  onClick,
  type = "button",
  disabled = false,
  tamanho = ""
}) {
  return (
    <button
      style={{ width: tamanho }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        cursor-pointer
        relative flex items-center justify-center gap-2
        h-14 px-6
        rounded-2xl
        text-lg font-medium
        text-white
        bg-[#144E7A]
        transition-all duration-300
        hover:brightness-110
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {/* Borda com gradiente */}
      <span
        className="
          absolute inset-0 rounded-2xl p-[3px]
          bg-gradient-to-r from-blue-400 via-blue-500 to-yellow-400
        "
      >
        <span className="block w-full h-full rounded-2xl bg-[#144E7A]" />
      </span>

      {/* Conteúdo */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && icon}
        {children}
      </span>
    </button>
  );
}