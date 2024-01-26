import { Dispatch, SetStateAction, useState } from "react";
import "./Switch.scss";
import { clsx } from "clsx";

type switchProps = {
  textLeft: string;
  textRight: string;
  onChange: Dispatch<SetStateAction<boolean>>;
};

export function Switch({ textLeft, textRight, onChange }: switchProps) {
  const [isActive, setIsActive] = useState(false);

  const leftClass = clsx("switch__text", "left", !isActive && "active");
  const rightClass = clsx("switch__text", "right", isActive && "active");

  return (
    <label className="switch">
      <span className={leftClass}>{textLeft}</span>
      <div className="switch__sliderholder">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsActive(e.target.checked);
            onChange(e.target.checked);
          }}
        />
        <span className="switch__slider"></span>
      </div>
      <span className={rightClass}>{textRight}</span>
    </label>
  );
}
