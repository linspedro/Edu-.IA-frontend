import MenuLateral from "../componentes/menuLateral";
import MenuAzul from "../componentes/MenuAzul";
import Input from "../componentes/input";
import CardPlano from "../componentes/CardPlano";



function BibliotecaPrincipal() {
  return (
    <section className="flex h-auto  bg-white">
      {/* Sidebar */}
      <MenuLateral />

      {/* Conteúdo */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <MenuAzul />

        {/* Conteúdo interno */}
        <div className="p-8 space-y-3 flex flex-col gap-11">
          <div>
            <h2 className="text-2xl font-semibold">Biblioteca</h2>
            <p className="text-gray-600">
              Gerencie e visualize todos os seus planos de aula
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="bg-gradient-to-r from-[#054D88] to-[#2499F9] text-blue-900 font-bold p-1 opacity-80 rounded-[10px] w-[300px]">
              <Input placeholder={"Buscar por disciplina"} />
            </div>
            <h3 className="text-2xl font-medium max-w-md">
              Edu+IA a sua plataforma confiável de desenvolvimento
            </h3>
          </div>

          {/* Cards */}
          <div className="flex gap-6 flex-wrap">
            <div>
            <CardPlano
              titulo="Função quadrática"
              serie="3º Ensino Médio"
              data="Abril • Criado em 22/04/2026"
              />


            </div>

            <CardPlano
              titulo="2º Guerra Mundial"
              serie="2º Ensino Médio"
              data="Abril • Criado em 22/04/2026"
            />

            <CardPlano
              titulo="DNA e RNA"
              serie="1º Ensino Médio"
              data="Abril • Criado em 22/04/2026"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BibliotecaPrincipal;
