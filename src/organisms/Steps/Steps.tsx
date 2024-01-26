import "./Steps.scss";

type stepsProps = {
  title: string;
  id: number;
};

type allSteps = {
  steps: stepsProps[];
  activeStep: number;
};

export function Steps({ steps, activeStep }: allSteps) {
  const items = steps.map((step) => {
    return (
      <li className="step" key={step.id}>
        <div
          className={`step__index ${step.id === activeStep ? "active" : ""}`}
        >
          {step.id}
        </div>
        <div className="step__content">
          <span>Step {step.id}</span>
          <h5>{step.title}</h5>
        </div>
      </li>
    );
  });

  return <ul className="steps">{items}</ul>;
}
