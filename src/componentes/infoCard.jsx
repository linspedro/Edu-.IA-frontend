export default function InfoCard({
  icon,
  title,
  description,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className="
        bg-white
        rounded-xl
        shadow-lg
        w-full
        max-w-sm
        p-4
        text-center
        flex flex-col
        items-center
        gap-3
        cursor-pointer
        hover:scale-105
        transition duration-300
      "
    >
      <div className="bg-blue-400 p-2 sm:p-3 rounded-lg text-white">
        {icon}
      </div>

      <h3 className="font-bold text-base sm:text-lg text-blue-400">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-blue-950 break-words">
        {description}
      </p>
    </div>
  );
}