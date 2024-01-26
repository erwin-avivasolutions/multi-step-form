import { clsx } from "clsx";
import { Checkbox } from "../../molecules/Checkbox/Checkbox";
import "./FormStep.scss";
import { Button } from "../../molecules/Button/Button";
import { Link } from "../../atoms/Link/Link";
import { Dispatch, SetStateAction, useState } from "react";
import { formDataObject } from "../../App";

type formStep = {
  isYearly: boolean;
  isActive: boolean;
  title: string;
  text: string;
  goToStep: (step: number) => void;
  formData: formDataObject;
  setFormData: Dispatch<SetStateAction<formDataObject>>;
};

const items = [
  {
    title: "Online service",
    text: "Access to multiplayer games",
    monthlyPrice: "+$1/mo",
    yearlyPrice: "+$10/yr",
    monthlyValue: 1,
    yearlyValue: 10,
  },
  {
    title: "Larger storage",
    text: "Extra 1TB of cloud save",
    monthlyPrice: "+$2/mo",
    yearlyPrice: "+$20/yr",
    monthlyValue: 2,
    yearlyValue: 20,
  },
  {
    title: "Customizable profile",
    text: "Custom theme on your profile",
    monthlyPrice: "+$2/mo",
    yearlyPrice: "+$20/yr",
    monthlyValue: 2,
    yearlyValue: 20,
  },
];

export function StepThree({
  isYearly,
  isActive,
  title,
  text,
  goToStep,
  formData,
  setFormData,
}: formStep) {
  const formStepClass = clsx("formstep", !isActive && "hidden");

  function handleOnChange(index: number, name: string, value: number) {
    let newExtras = formData.extras;

    if (newExtras[index] !== undefined) {
      newExtras = newExtras.map((extra: any, i: number) => {
        if (i !== index) {
          return extra;
        }
      });
    } else {
      newExtras[index] = {
        name: name,
        value: value,
      };
    }

    formData.extras = newExtras;

    setFormData({ ...formData });
  }

  const checkBoxes = items.map((item, index) => {
    return (
      <Checkbox
        key={index}
        index={index}
        title={item.title}
        text={item.text}
        price={isYearly ? item.yearlyPrice : item.monthlyPrice}
        value={item.monthlyValue}
        handleOnChange={handleOnChange}
        isActive={formData.extras[index] !== undefined}
      />
    );
  });

  return (
    <div className={formStepClass}>
      <h2 className="title">{title}</h2>
      <p className="content">{text}</p>
      {checkBoxes}
      <div className="button-holder">
        <Button
          type="button"
          style="primary"
          text="Next Step"
          onClick={() => goToStep(4)}
        />
        <Link text="Go Back" onClick={() => goToStep(2)} />
      </div>
    </div>
  );
}
