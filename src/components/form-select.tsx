import { RegisterOptions, useFormContext } from "react-hook-form";
import "./ui.css";

export function FormSelect({
  id,
  label,
  options,
  fieldOptions,
  ...rest
}: {
  id: string;
  label: string;
  options: { name: string; value: string }[];
  fieldOptions: RegisterOptions;
} & React.ComponentProps<"select">) {
  const { register, setValue } = useFormContext();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue(id, value); // Set value here so form state has the latest value when onChange is called.
    rest.onChange?.(e);
  };

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        {...register(id, fieldOptions)}
        {...rest}
        onChange={onChange}
      >
        {options.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
