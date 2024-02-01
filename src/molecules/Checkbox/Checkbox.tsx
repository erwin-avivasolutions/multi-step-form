import { useState } from "react";
import { Icon } from "../../atoms/Icon/Icon";
import "./Checkbox.scss";

type checkboxProps = {
  index: number;
  title: string;
  text: string;
  price: string;
  value: number;
  handleOnChange: (index: number, name: string, value: number) => void;
  isActive: boolean;
};

export function Checkbox({
  index,
  title,
  text,
  price,
  value,
  handleOnChange,
  isActive,
}: checkboxProps) {
  return (
    <>
      <input
        type="checkbox"
        id={`checkbox-${index}`}
        name="extras"
        value={value}
        checked={isActive}
        onChange={() => handleOnChange(index, title, value)}
        className="hidden_checkbox"
      />
      <label
        htmlFor={`checkbox-${index}`}
        className={`checkbox ${isActive ? "active" : ""}`}
      >
        <div className={`checkbox__box ${isActive ? "checked" : ""}`}>
          <Icon type="IconCheckmark" size="small" />
        </div>
        <div className="checkbox__content">
          <h4>{title}</h4>
          <span>{text}</span>
        </div>
        <div className="checkbox__price">{price}</div>
      </label>
    </>
  );
}
