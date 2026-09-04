"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Field } from "@/components/molecules/field";
import { Button } from "@/components/ui/button";
import type { FormFieldSchema } from "@/content/types";

type SchemaFormProps = {
  /** Prefix for generated control ids, e.g. "contact" → "contact-name". */
  idPrefix: string;
  fields: FormFieldSchema[];
  submitLabel: string;
  submitIcon?: ReactNode;
  /** Class for the <form> element. */
  className?: string;
  /** Class override for the submit Button. */
  submitClassName?: string;
  onSubmit?: (values: Record<string, string>) => void;
};

export function SchemaForm({
  idPrefix,
  fields,
  submitLabel,
  submitIcon,
  className = "space-y-8",
  submitClassName,
  onSubmit,
}: SchemaFormProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? ""])),
  );

  const updateValue = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(values);
  };

  return (
    <form action="#" className={className} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        {fields.map((field) => (
          <Field
            key={field.name}
            id={`${idPrefix}-${field.name}`}
            name={field.name}
            label={field.label}
            as={field.control}
            type={field.type}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            required={field.required}
            rows={field.rows}
            options={field.options}
            value={values[field.name] ?? ""}
            onChange={(value) => updateValue(field.name, value)}
            wrapperClassName={
              field.fullWidth ? "space-y-2 sm:col-span-2" : "space-y-2"
            }
          />
        ))}
      </div>
      <Button
        type="submit"
        label={submitLabel}
        icon={submitIcon}
        className={submitClassName}
      />
    </form>
  );
}
