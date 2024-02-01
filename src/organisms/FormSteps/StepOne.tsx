import { Input } from "../../molecules/Input/Input";
import { clsx } from "clsx";
import { Button } from "../../molecules/Button/Button";
import { Dispatch, SetStateAction, useState } from "react";
import "./FormStep.scss";
import { formDataObject } from "../../App";

export type formStepProps = {
  isActive: boolean;
  title: string;
  text: string;
  goToStep: (step: number) => void;
  formData: React.ComponentState;
  setFormData: Dispatch<SetStateAction<formDataObject>>;
};

type validFieldsObject = {
  name: number;
  email: number;
  phonenumber: number;
};

export function StepOne({
  isActive,
  title,
  text,
  goToStep,
  formData,
  setFormData,
}: formStepProps) {
  const [validFields, setValidFields] = useState<validFieldsObject>({
    name: 2,
    email: 2,
    phonenumber: 2,
  });

  const formStepClass = clsx("formstep", !isActive && "hidden");

  function handleOnChange(name: string, value: string) {
    const data = formData;
    data.stepOne[name] = value;

    setFormData({ ...formData });
  }

  function handleOnBlur(name: string, validity: boolean) {
    setValidFields({ ...validFields, [name]: validity ? 1 : 0 });
  }

  function onSubmit() {
    if (Object.values(validFields).every((v) => v === 1)) {
      goToStep(2);
      return;
    }

    var newFields = validFields;
    for (const [key, value] of Object.entries(validFields)) {
      if (value === 2) {
        newFields = { ...newFields, [key]: 0 };
      }
    }
    setValidFields(newFields);
  }

  return (
    <div className={formStepClass}>
      <h2 className="title">{title}</h2>
      <p className="content">{text}</p>
      <Input
        type="text"
        name="name"
        labelText="Name"
        placeholder="John Doe"
        // errorText={validFields.name}
        value={formData.name}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        isValid={validFields.name}
      />
      <Input
        type="email"
        name="email"
        labelText="E-mail address"
        placeholder="email@address.com"
        // errorText={validFields.email}
        value={formData.email}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        isValid={validFields.email}
      />
      <Input
        type="tel"
        name="phonenumber"
        labelText="Phone number"
        placeholder="+31 6 12 345 678"
        // errorText={validFields.phonenumber}
        value={formData.phonenumber}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        isValid={validFields.phonenumber}
      />
      <div className="button-holder">
        <Button
          type="button"
          style="primary"
          text="Next Step"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
}
