import { useState } from "react";
import MenuLateral from "../componentes/menuLateral";
import MenuAzul from "../componentes/MenuAzul";
import Input from "../componentes/input";
import CardPlano from "../componentes/CardPlano";

function BibliotecaPrincipal() {
  const planos = [
    {
      titulo: "Química ecológica",
      serie: "3º Ensino Médio",
      data: "Maio • Criado em 22/04/2026",
      tipo: "Plano de Aula",
    },
    {
      titulo: "2º Guerra Mundial",
      serie: "2º Ensino Médio",
      data: "Abril • Criado em 22/04/2026",
      tipo: "Plano de Aula",
    },
    {
      titulo: "DNA e RNA",
      serie: "1º Ensino Médio",
      data: "Abril • Criado em 22/04/2026",
      tipo: "Plano de Aula",
    },
    {
      titulo: "Cronograma de Biologia",
      serie: "3º Ensino Médio",
      data: "Junho • Criado em 18/06/2026",
      tipo: "Cronograma",
      navega: "/VisualizarBibliotecao",
    },
    {
      titulo: "Cronograma ENEM",
      serie: "3º Ensino Médio",
      data: "Julho • Criado em 20/06/2026",
      tipo: "Cronograma",
    },
    {
      titulo: "Campeonato De Matematica",
      serie: "3º Ensino Médio",
      data: "Julho • Criado em 30/07/2026",
      tipo: "Atividade",
    },
  ];

  const [busca, setBusca] = useState("");

  const dadosFiltrados = planos.filter((item) =>
    item.titulo.toLowerCase().includes(busca.toLowerCase()),
  );

  const planosDeAula = dadosFiltrados.filter(
    (item) => item.tipo === "Plano de Aula",
  );

  const cronogramas = dadosFiltrados.filter(
    (item) => item.tipo === "Cronograma",
  );

    const Atividade = dadosFiltrados.filter(
    (item) => item.tipo === "Atividade",
  );

  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-white">
      <MenuLateral />

      <div className="flex flex-col flex-1 min-w-0">
        <MenuAzul Text="Biblioteca" />

        <div className="p-4 md:p-8 space-y-8">
          <div>
            <h2 className="text-3xl font-semibold">Biblioteca</h2>
            <p className="text-gray-600">
              Gerencie e visualize todos os seus planos de aula e cronogramas.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="w-full max-w-md">
              <Input
                placeholder="Buscar por título"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <h3 className="text-xl font-medium">
              Edu+IA, sua plataforma de desenvolvimento.
            </h3>
          </div>

          {/* Planos de Aula */}
          <div>
            <h3 className="text-2xl font-bold mb-5">Planos de Aula</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {planosDeAula.map((item, index) => (
                <CardPlano
                  key={index}
                  titulo={item.titulo}
                  serie={item.serie}
                  data={item.data}
                  tipo={item.tipo}
                  navega={item.navega}
                />
              ))}
            </div>
          </div>

          {/* Cronogramas */}
          <div>
            <h3 className="text-2xl font-bold mb-5">Cronogramas</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {cronogramas.map((item, index) => (
                <CardPlano
                  key={index}
                  titulo={item.titulo}
                  serie={item.serie}
                  data={item.data}
                  tipo={item.tipo}
                  navega={item.navega}
                />
              ))}
            </div>
          </div>

                    {/* ATIVIDADE */}
          <div>
            <h3 className="text-2xl font-bold mb-5">Atividades</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Atividade.map((item, index) => (
                <CardPlano
                  key={index}
                  titulo={item.titulo}
                  serie={item.serie}
                  data={item.data}
                  tipo={item.tipo}
                  navega={item.navega}
                />
              ))}
            </div>
          </div>

          {dadosFiltrados.length === 0 && (
            <p className="text-center text-red-500 font-medium">
              Nenhum resultado encontrado.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default BibliotecaPrincipal;
