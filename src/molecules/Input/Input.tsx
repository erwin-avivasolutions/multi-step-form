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
  isValid: number;
};

export function Input({
  type,
  placeholder,
  name,
  labelText,
  value,
  onChange,
  onBlur,
  isValid,
}: inputProps) {
  const [errorText, setErrorText] = useState<string>("");

  const errorClass = clsx("label__content--error", isValid === 0 && "show");
  const inputClass = clsx("label__input", isValid === 0 && "error");

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
        onChange={(e) => {
          onChange(e.target.name, e.target.value);
        }}
        onBlur={(e) => {
          let message = e.target.validationMessage;
          setErrorText(message);
          onBlur(e.target.name, e.target.checkValidity());
        }}
        required
        pattern={type === "tel" ? "[0-9]{10}" : undefined}
      />
    </label>
  );
}
