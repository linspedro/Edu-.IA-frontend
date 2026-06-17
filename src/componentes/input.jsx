export default function Input({
  type = "text",
  placeholder,
  largura = "w-full",
  required = false,
  value,
  onChange,
  ...rest
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          ${largura}
          h-10 sm:h-12
          rounded-lg
          px-4 sm:px-5
          border border-gray-300
          bg-gray-100
          text-sm sm:text-base
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
          placeholder:opacity-70
          focus:placeholder:opacity-0
          transition
        `}
        {...rest}
      />
    </div>
  );
}