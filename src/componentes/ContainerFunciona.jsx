export default function Containercomofunciona({ children }) {
  return (
    <div
      className="
        bg-[#225C8C]
        border-2 sm:border-4
        border-yellow-400
        p-4 sm:p-6 md:p-8
        w-full
        max-w-[800px]
        mx-auto
        text-center
        flex flex-col
        items-center
        gap-2 sm:gap-4
        rounded-xl
      "
    >
      {children}
    </div>
  );
}