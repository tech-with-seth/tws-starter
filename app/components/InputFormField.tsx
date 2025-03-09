import type { PropsWithChildren } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputFormFieldProps {
  id: string;
  label: string;
  name: string;
  type: string;
  errorText?: string;
}

function InputError({ children }: PropsWithChildren) {
  return <div className="text-sm text-red-500">{children}</div>;
}

export function InputFormField({
  id,
  errorText,
  label,
  name,
  type,
}: InputFormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} name={name} />
      {errorText && <InputError>{errorText}</InputError>}
    </div>
  );
}
