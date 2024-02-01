import { useState } from "react";
import { Steps } from "./organisms/Steps/Steps";
import { StepOne } from "./organisms/FormSteps/StepOne";
import { StepTwo } from "./organisms/FormSteps/StepTwo";
import { StepThree } from "./organisms/FormSteps/StepThree";
import { StepFour } from "./organisms/FormSteps/StepFour";
import "./App.scss";
import { ThankYouStep } from "./organisms/ThankYouStep/ThankYouStep";

const steps = [
  {
    title: "Your info",
    id: 1,
  },
  {
    title: "Select plan",
    id: 2,
  },
  {
    title: "Add-ons",
    id: 3,
  },
  {
    title: "Summary",
    id: 4,
  },
];

export type extras = {
  name: string;
  value: number;
};

export type formDataObject = {
  stepOne: {
    name: string;
    email: string;
    phonenumber: string;
  };
  subscription: {
    name: string;
    value: number;
  };
  extras: extras[];
};

function App() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [formData, setFormData] = useState<formDataObject>({
    stepOne: {
      name: "",
      email: "",
      phonenumber: "",
    },
    subscription: {
      name: "",
      value: 0,
    },
    extras: [],
  });
  const [isYearly, setIsYearly] = useState<boolean>(false);

  function goToStep(step: number) {
    setActiveStep(step);
  }

  //onSubmit maken
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch("http://localhost:443/form_submissions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((result) => {
        console.log(result);
        // goToStep(5);
      })
      .catch((err) => {
        console.error(err);
        // setMessage(err.toString());
        // setStatus('error');
      });
  }

  return (
    <div className="container">
      <div className="multi-form">
        <div className="multi-form__steps">
          <Steps steps={steps} activeStep={activeStep} />
        </div>
        {activeStep !== 5 && (
          <form className="form-container" onSubmit={(e) => onSubmit(e)}>
            <StepOne
              isActive={activeStep === 1}
              title="Personal info"
              text="Please provide your name, email address, and phone number."
              goToStep={goToStep}
              formData={formData}
              setFormData={setFormData}
            />
            <StepTwo
              isActive={activeStep === 2}
              isYearly={isYearly}
              setIsYearly={setIsYearly}
              title="Select your plan"
              text="You have the option of monthly or yearly billing"
              goToStep={goToStep}
              formData={formData}
              setFormData={setFormData}
            />
            <StepThree
              isActive={activeStep === 3}
              isYearly={isYearly}
              title="Pick add-ons"
              text="Add-ons help enhance your gaming experience"
              goToStep={goToStep}
              formData={formData}
              setFormData={setFormData}
            />
            <StepFour
              isActive={activeStep === 4}
              isYearly={isYearly}
              title="Finishing up"
              text="Double-check everything looks OK before confirming."
              goToStep={goToStep}
              formData={formData}
            />
          </form>
        )}
        {activeStep === 5 && <ThankYouStep title="Thank you!" />}
      </div>
    </div>
  );
}

export default App;
