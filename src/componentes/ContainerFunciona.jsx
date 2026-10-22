
export default function Containercomofunciona({ children }) {
  return (
    <div
      className="
        w-full
        max-w-6xl
        mx-auto
        rounded-2xl
        border border-gray-200
        bg-white
        p-5
        sm:p-8
        md:p-10
        text-center
        flex flex-col
        items-center
        gap-4
      "
    >
      {children}
    </div>
  );
}
