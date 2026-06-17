export default function Footer({
  companyName = "Minha Empresa",
  links = [
    { name: "Gerador de Planos", href: "#" },
    { name: "Criador de Planos", href: "#" },
    { name: "Biblioteca", href: "#" },
  ],
  bottomText = "Todos os direitos reservados."
}) {
  return (
    <footer className="bg-white text-black py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* Topo */}
        <div className="
          flex flex-col md:flex-row
          justify-between items-center
          gap-6
          border-b border-gray-300
          pb-6
        ">
          <h2
            className="
              text-2xl sm:text-3xl md:text-4xl
              font-bold
              bg-gradient-to-b from-blue-600 to-white
              bg-clip-text
              text-transparent
              text-center
            "
          >
            {companyName}
          </h2>

          <nav
            className="
              flex flex-col sm:flex-row
              items-center
              gap-3 sm:gap-6
              text-center
            "
          >
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:opacity-70 transition"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Parte inferior */}
        <div className="text-center mt-6 text-xs sm:text-sm text-gray-400">
          {bottomText}
        </div>
      </div>
    </footer>
  );
}