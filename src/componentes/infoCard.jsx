export default function InfoCard({ icon, title, description,onClick }) {
  return (
    <div className="bg-white rounded-xl shadow-lg w-auto h-auto p-2 text-center flex flex-col items-center gap-3 hover:scale-105 transition duration-300" onClick={onClick}>
      
      <div className="bg-blue-400 p-2 rounded-lg text-white">
        {icon} {/* AQUI é a correção */}
      </div>

      <h3 className="font-bold text-lg text-blue-400">
        {title}
      </h3>

      <p className="text-sm text-blue-950">
        {description}
      </p>

    </div>
  );
}