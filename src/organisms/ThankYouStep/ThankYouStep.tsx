import { Icon } from "../../atoms/Icon/Icon";
import "./ThankYouStep.scss";

type ThankYouStepProps = {
  title: string;
};

export function ThankYouStep({ title }: ThankYouStepProps) {
  return (
    <div className="thank-you-step">
      <Icon type="IconThankyou" size="large" />
      <h1>{title}</h1>
      <p>
        Thanks for comfirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com
      </p>
    </div>
  );
}
