import { useRef, useState } from "react";
import "./Input.scss";
import { clsx } from "clsx";

type inputProps = {
  labelText: string;
  name: string;
  type: string;
  value: string | number;
  placeholder: string;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string, validity: boolean) => void;
  isValid: boolean;
  errorText: string;
};

export function Input({
  type,
  placeholder,
  name,
  labelText,
  value,
  errorText,
  onChange,
  onBlur,
  isValid,
}: inputProps) {
  const errorClass = clsx("label__content--error", !isValid && "show");
  const inputClass = clsx("label__input", !isValid && "error");

  return (
    <label className="label">
      <div className="label__content">
        <span className="label__content--text">{labelText}</span>
        <span className={errorClass}>{errorText}</span>
      </div>
      <input
        className={inputClass}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.name, e.target.value);
        }}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
          let validity = e.target.checkValidity();
          onBlur(e.target.name, validity);
        }}
        required
        pattern={type === "tel" ? "[0-9]{10}" : undefined}
      />
    </label>
  );
}
