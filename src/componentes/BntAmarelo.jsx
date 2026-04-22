

export default function BntAmarelo ({children, onClick, type = "button", disabled = false }) {
    return(
      <button type={type}  onClick={onClick} disabled={disabled} className=" w-28 h-8 rounded-[5px] border-2 text-white bg-gradient-to-b from-[#2499F9] to-[#F3C81E]   hover:border-amber-200 transition cursor-pointer"  >{children} </button>
    )
}