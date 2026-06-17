import Edu from "../assets/Edu.png";

export default function MenuAzul({ Text }) {
  return (
    <header
      className="
        bg-blue-500
        flex
        justify-between
        items-center
        w-full
        h-20 sm:h-24 md:h-28
        px-2 sm:px-4
      "
    >
      <div
        className="
          text-white
          font-Poppins
          text-lg sm:text-2xl md:text-[30px]
        "
      >
        <h2>{Text}</h2>
      </div>

      <figure>
        <img
          src={Edu}
          alt="Logo Edu+.IA"
          className="
            w-20
            sm:w-28
            md:w-40
            h-auto
          "
        />
      </figure>
    </header>
  );
}