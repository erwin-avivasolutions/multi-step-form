import { clsx } from "clsx";
import { Button } from "../../molecules/Button/Button";
import { Link } from "../../atoms/Link/Link";
import { formDataObject } from "../../App";
import "./FormStep.scss";
import "./StepFour.scss";

type formStep = {
  isYearly: boolean;
  isActive: boolean;
  title: string;
  text: string;
  goToStep: (step: number) => void;
  formData: formDataObject;
};

export function StepFour({
  isYearly,
  isActive,
  title,
  text,
  goToStep,
  formData,
}: formStep) {
  const formStepClass = clsx("formstep", !isActive && "hidden");
  let total = formData.subscription.value;

  const extras = formData.extras.map((item, index) => {
    if (item !== undefined) {
      total += item.value;
      return (
        <div className="tab__body--item" key={index}>
          <span className="name">{item.name}</span>
          <span className="price">
            +${isYearly ? `${item.value * 10}/yr` : `${item.value}/mo`}
          </span>
        </div>
      );
    }
  });

  if (isYearly) {
    total = total * 10;
  }

  return (
    <div className={formStepClass}>
      <h2 className="title">{title}</h2>
      <p className="content">{text}</p>
      <div className="tab">
        <div className="tab__head">
          <div className="tab__head--left">
            <h4 className="tab__head--title">
              {formData.subscription.name}
              {isYearly ? " (Yearly)" : " (Monthly)"}
            </h4>
            <Link text="Change" onClick={() => goToStep(2)} />
          </div>
          <div className="tab__head--right">
            <h4 className="tab__head--price">
              {isYearly
                ? `$${formData.subscription.value * 10}/yr`
                : `$${formData.subscription.value}/mo`}
            </h4>
          </div>
        </div>
        <div className="tab__body">{extras}</div>
      </div>

      <div className="totals">
        <span>Total (per {isYearly ? "year" : "month"})</span>
        <h3>
          ${total}/{isYearly ? "yr" : "mo"}
        </h3>
      </div>
      <div className="button-holder">
        <Button type="submit" style="secondary" text="Confirm" />
        <Link text="Go Back" onClick={() => goToStep(3)} />
      </div>
    </div>
  );
}
