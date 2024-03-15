import { useForm } from "react-hook-form";

export default function Input({
  type,
  label,
  placeholder,
  register,
  name,
  defaultValue,
}) {
  return (
    <div className="mt-4 ">
      <div className="mb-4  xsm:mb-2 xsm:text-sm font-medium">
        <label htmlFor={name}>{label}</label>
      </div>
      <input
        type={type ? type : "text"}
        defaultValue={defaultValue}
        id={name}
        placeholder={placeholder}
        {...register(name)}
        className="border-2 rounded-md border-gray p-2 xsm:p-1 w-full"
      />
    </div>
  );
}
