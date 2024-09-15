import { RegisterOptions, useFormContext } from "react-hook-form";
import "./ui.css";

export function FormInput({
  id,
  label,
  fieldOptions,
  ...rest
}: {
  id: string;
  label: string;
  fieldOptions: RegisterOptions;
} & React.ComponentProps<"input">) {
  const { register, getFieldState, formState } = useFormContext();
  const { error } = getFieldState(id, formState);

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...register(id, fieldOptions)} {...rest} />
      {error && <span className="error">{error.message}</span>}
    </div>
  );
}
