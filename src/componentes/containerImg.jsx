export default function ImageContainer({ img, alt = "imagem" }) {
  return (
    <div
      className="
        flex items-center justify-center
        w-full
        px-2 sm:px-4
        transition duration-300
        hover:scale-105
      "
    >
      <div className="bg-amber-200 rounded-xl shadow-lg p-1.5 w-full max-w-md">
        <img
          src={img}
          alt={alt}
          className="
            w-full
            h-auto
            object-contain
            rounded-lg
          "
        />
      </div>
    </div>
  );
}