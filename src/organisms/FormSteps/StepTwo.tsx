import { Radiobox } from "../../molecules/Radiobox/Radiobox";
import { Switch } from "../../molecules/Switch/Switch";
import { Icon } from "../../atoms/Icon/Icon";
import { clsx } from "clsx";
import { Button } from "../../molecules/Button/Button";
import { Link } from "../../atoms/Link/Link";
import { Dispatch, SetStateAction, useState } from "react";
import "./FormStep.scss";
import { formDataObject } from "../../App";

type formStep = {
  isYearly: boolean;
  isActive: boolean;
  title: string;
  text: string;
  goToStep: (step: number) => void;
  setIsYearly: Dispatch<SetStateAction<boolean>>;
  formData: formDataObject;
  setFormData: Dispatch<SetStateAction<formDataObject>>;
};

const items = [
  {
    icon: <Icon type="IconArcade" />,
    title: "Arcade",
    name: "Arcade",
    value: 9,
    monthlyValue: "$9/mo",
    yearlyValue: "$90/yr",
    offerText: "2 months free",
  },
  {
    icon: <Icon type="IconAdvanced" />,
    title: "Advanced",
    name: "Advanced",
    value: 12,
    monthlyValue: "$12/mo",
    yearlyValue: "$120/yr",
    offerText: "2 months free",
  },
  {
    icon: <Icon type="IconPro" />,
    title: "Pro",
    name: "Pro",
    value: 15,
    monthlyValue: "$15/mo",
    yearlyValue: "$150/yr",
    offerText: "2 months free",
  },
];

export function StepTwo({
  isYearly,
  setIsYearly,
  isActive,
  title,
  text,
  goToStep,
  formData,
  setFormData,
}: formStep) {
  const [valid, setValid] = useState<boolean>(true);
  const formStepClass = clsx("formstep", !isActive && "hidden");
  const errorClass = clsx("error", !valid && "show");

  function handleOnChange(name: string, choice: number) {
    const newData = formData;
    newData.subscription = {
      name,
      value: choice,
    };

    setFormData({ ...newData });
    setValid(true);
  }

  function onSubmit() {
    if (formData.subscription.name !== "" && formData.subscription.value > 0) {
      goToStep(3);
    } else {
      setValid(false);
    }
  }

  return (
    <div className={formStepClass}>
      <h2 className="title">{title}</h2>
      <p className="content">{text}</p>
      <span className={errorClass}>Please select an option</span>
      <Radiobox
        items={items}
        isYearly={isYearly}
        option={formData.subscription.name}
        onChange={handleOnChange}
      />
      <Switch textLeft="Monthly" textRight="Yearly" onChange={setIsYearly} />
      <div className="button-holder">
        <Button
          type="button"
          style="primary"
          text="Next Step"
          onClick={onSubmit}
        />
        <Link text="Go Back" onClick={() => goToStep(1)} />
      </div>
    </div>
  );
}
