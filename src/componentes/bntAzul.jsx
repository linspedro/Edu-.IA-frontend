

export default function BntAzul ({children, onClick, type = "button", disabled = false }) {
    return(
      <button type={type}  onClick={onClick} disabled={disabled} className=" w-28 h-8 rounded-[5px] border-2 text-white bg-gradient-to-b from-[#2499F9] to-[#054D88]   hover:border-amber-300 transition cursor-pointer"  >{children} </button>
    )
}