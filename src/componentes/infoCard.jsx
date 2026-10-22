
export default function InfoCard({
  icon,
  title,
  description,
  onClick,
}) {
  const clicavel = Boolean(onClick);

  return (
    <article
      onClick={onClick}
      onKeyDown={(e) => {
        if (clicavel && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      role={clicavel ? "button" : undefined}
      tabIndex={clicavel ? 0 : undefined}
      className={`
        flex
        w-full
        max-w-sm
        flex-col
        items-center
        gap-3
        rounded-2xl
        border
        border-amber-300
        bg-white
        p-6
        text-center
        transition-all
        duration-200
        ${
          clicavel
            ? "cursor-pointer hover:-translate-y-1 hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            : "hover:border-blue-200"
        }
      `}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-300 text-blue-700">
        {icon}
      </div>

      <h3 className="text-base font-bold text-gray-900 sm:text-lg">
        {title}
      </h3>

      <p className="break-words text-sm leading-6 text-gray-500">
        {description}
      </p>
    </article>
  );
}
