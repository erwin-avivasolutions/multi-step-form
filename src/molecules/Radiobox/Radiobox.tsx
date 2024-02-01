import { ReactNode } from "react";
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
      <div className="radio-holder" key={index}>
        <input
          type="radio"
          value={item.value}
          checked={option === item.name}
          onChange={() => onChange(item.name, item.value)}
          name="subscription"
          required
          className="hidden_input"
          id={`radiobox-${index}`}
        />
        <label
          htmlFor={`radiobox-${index}`}
          className={`radiobox ${option === item.name ? "active" : ""}`}
        >
          {item.icon}
          <h4>{item.title}</h4>
          <span className="radiobox__price">
            {isYearly ? item.yearlyValue : item.monthlyValue}
          </span>
          {isYearly && (
            <span className="radiobox__offer">{item.offerText}</span>
          )}
        </label>
      </div>
    );
  });
  return <div className="radios">{radios}</div>;
}
