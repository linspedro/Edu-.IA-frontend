import Edu from "../assets/Edu.png"
export default function MenuAzul (){
    return(
        <header className="bg-blue-500 flex justify-between items-center w-full h-28 ">
            <div className="text-center ml-2 text-white text-[30px] font-Poppins">
                <h2>Bem-vindo a Biblioteca</h2>
            </div>

            <figure><img src={Edu} alt="" className="w-40"/></figure>
        </header>
    )
}