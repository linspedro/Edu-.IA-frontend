export default function Input({
  type = "text",
  placeholder,
  largura = "auto",
  required = false,
  value,
  onChange,
  ...rest
}) {
  return (
    <div className="flex flex-col gap-2">
      <input
        style={{ width: largura }}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 rounded-lg px-5 border border-gray-300 bg-gray-100 text-base 
        focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:opacity-70 focus:placeholder:opacity-0 transition"
        required={required}
        {...rest}
      />
    </div>
  );
}