export default function BtnAmarelo({
  children,
  onClick,
  type = "button",
  disabled = false,
  tamanho = "w-full sm:w-auto",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${tamanho}
        cursor-pointer
        relative flex items-center justify-center
        h-12 sm:h-14
        px-4 sm:px-6
        rounded-xl sm:rounded-2xl
        text-base sm:text-lg
        font-medium
        text-white
        transition-all duration-300
        hover:scale-[1.02]
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <span
        className="
          absolute inset-0 rounded-xl sm:rounded-2xl p-[3px]
          bg-gradient-to-b from-yellow-400 via-yellow-300 to-blue-400
        "
      >
        <span className="block w-full h-full rounded-xl sm:rounded-2xl bg-[#0F4C75]" />
      </span>

      <span className="relative z-10 text-center">
        {children}
      </span>
    </button>
  );
}