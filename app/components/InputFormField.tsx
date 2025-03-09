import type { PropsWithChildren } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { OctagonX } from "lucide-react";

interface InputFormFieldProps {
  id: string;
  label: string;
  name: string;
  type: string;
  errorText?: string | string[];
}

function InputError({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center gap-1 text-sm text-red-500">
      {children}
    </div>
  );
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
      {errorText && (
        <InputError>
          <OctagonX className="h-4 w-4" />
          <p>{errorText}</p>
        </InputError>
      )}
    </div>
  );
}
