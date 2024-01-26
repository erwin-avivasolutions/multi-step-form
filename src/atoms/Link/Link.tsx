import "./Link.scss";

type linkProps = {
  text: string;
  onClick: () => void;
};

export function Link({ text, onClick }: linkProps) {
  return (
    <button className="link" type="button" onClick={() => onClick()}>
      {text}
    </button>
  );
}
