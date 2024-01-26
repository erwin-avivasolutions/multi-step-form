import "./Button.scss";

type buttonProps = {
  text: string;
  type: "button" | "submit";
  style: "primary" | "secondary";
  onClick?: () => void;
};

export function Button({ text, type, style, onClick }: buttonProps) {
  return (
    <button
      type={type}
      className={`button ${style}`}
      onClick={() => (onClick ? onClick() : undefined)}
    >
      {text}
    </button>
  );
}
