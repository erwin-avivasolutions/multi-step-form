import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import "./Radiobox.scss";

type radioboxProps = {
  icon: ReactNode;
  title: string;
  name: string;
  value: number;
  monthlyValue: string;
  yearlyValue: string;
  offerText: string;
};

type radioboxes = {
  items: radioboxProps[];
  isYearly: boolean;
  option: string;
  onChange: (name: string, value: number) => void;
};

export function Radiobox({ items, isYearly, option, onChange }: radioboxes) {
  const radios = items.map((item, index) => {
    return (
      <label
        className={`radiobox ${option === item.name ? "active" : ""}`}
        key={index}
      >
        <input
          type="radio"
          value={item.value}
          checked={option === item.name}
          onChange={() => onChange(item.name, item.value)}
          name="subscription"
          required
        />
        {item.icon}
        <h4>{item.title}</h4>
        <span className="radiobox__price">
          {isYearly ? item.yearlyValue : item.monthlyValue}
        </span>
        {isYearly && <span className="radiobox__offer">{item.offerText}</span>}
      </label>
    );
  });
  return <div className="radios">{radios}</div>;
}
