export default function ImageContainer({ img, alt = "imagem" }) {
    return (
        <div className=" flex items-center justify-center w-full max-w-md object-contain transition duration-300 hover:scale-105">
            <div className="bg-amber-200 rounded-xl shadow-lg p-1.5">
                <img 
                    src={img} 
                    alt={alt} 
                    className="w-full max-w-md object-contain"
                />
            </div>
        </div>
    )
}