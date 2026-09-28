type expectedString = "title" | "url" | "description";
import "./new-link-styling.css";

interface Props {
  label: string;
  inputValue: expectedString;
  value: string;
  onChange: (newValue: string) => void;
}

export default function TextInputField(props: Props) {
  return (
    <>
      <div className="input">
        <label htmlFor={props.inputValue}> {props.label} </label>
        <input
          type="text"
          name="text-input"
          id={props.inputValue}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </div>
    </>
  );
}
