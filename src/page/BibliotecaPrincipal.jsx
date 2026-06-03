import { useEffect, useState } from "react";
import MenuLateral from "../componentes/menuLateral";
import MenuAzul from "../componentes/MenuAzul";
import Input from "../componentes/input";
import CardPlano from "../componentes/CardPlano";

function BibliotecaPrincipal() {
  // base local (seus cards)
  const planos = [
    {
      titulo: "Química ecológica",
      serie: "3º Ensino Médio",
      data: "Maio • Criado em 22/04/2026",
      navega: "/VisualizarBiblioteca",
    },
    {
      titulo: "2º Guerra Mundial",
      serie: "2º Ensino Médio",
      data: "Abril • Criado em 22/04/2026",
    },
    {
      titulo: "DNA e RNA",
      serie: "1º Ensino Médio",
      data: "Abril • Criado em 22/04/2026",
    },
  ];

  const [disciplina, setDisciplina] = useState("");
  const [loading, setLoading] = useState(false);
  const [dadosFiltrados, setDadosFiltrados] = useState(planos);

  const buscar = () => {
    setLoading(true);

    setTimeout(() => {
      const filtro = planos.filter((item) =>
        item.titulo.toLowerCase().includes(disciplina.toLowerCase()),
      );
      console.log(filtro);

      setDadosFiltrados(filtro);
      setLoading(false);
    }, 300); // simula leve delay
  };

  // // decide o que mostrar
  // const listaParaExibir = disciplina ? dadosFiltrados : planos;

  // executa toda vez que a variavel disciplina muda
  useEffect(() => {
    buscar();
  }, [disciplina]);

  // so qexecuta quando abrir a pagina (1 vez apenas)
  useEffect(() => {
    async function buscarBackend() {
      const response = await fetch(
        "http://localhost:3000/buscar?disciplina=biologia",
      );

      const dados = await response.json();

      console.log("Resposta do backend:", dados);
    }

    buscarBackend();
  }, []);

  return (
    <section className="flex flex-col md:flex-row h-auto bg-white">
      <MenuLateral />

      <div className="flex flex-col flex-1 min-w-0">
        <MenuAzul />

        <div className="p-4 md:p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Biblioteca</h2>
            <p className="text-gray-600">
              Gerencie e visualize todos os seus planos de aula
            </p>
          </div>

          {/* BUSCA */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex gap-2 w-full lg:w-auto">
              <div className="bg-gradient-to-r from-[#054D88] to-[#2499F9] p-1 opacity-80 rounded-[10px] flex-1 lg:w-[300px]">
                <Input
                  placeholder="Buscar por disciplina"
                  value={disciplina}
                  onChange={(e) => setDisciplina(e.target.value)}
                />
              </div>

              <button
                onClick={buscar}
                className="bg-[#054D88] hover:bg-[#043b69] text-white px-5 py-2 rounded-[10px] font-medium transition"
              >
                Buscar
              </button>
            </div>

            <h3 className="text-xl md:text-2xl font-medium max-w-md">
              Edu+IA a sua plataforma confiável de desenvolvimento
            </h3>
          </div>

          {/* CARDS */}
          <div className="flex gap-6 flex-wrap justify-center lg:justify-start">
            {loading && (
              <p className="text-blue-500 font-medium w-full text-center">
                Buscando resultados...
              </p>
            )}

            {!loading &&
              dadosFiltrados.map((item, index) => (
                <CardPlano
                  key={index}
                  titulo={item.titulo}
                  serie={item.serie}
                  data={item.data}
                  navega={item.navega}
                />
              ))}

            {!loading && disciplina && dadosFiltrados.length === 0 && (
              <p className="text-red-500 font-medium w-full text-center">
                Nenhum resultado encontrado
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BibliotecaPrincipal;
