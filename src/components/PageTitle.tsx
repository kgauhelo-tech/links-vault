import "./small-components-styling.css";
import "./navigation";
import { navigateTo } from "./navigation";
import { BackButton } from "./Buttons";

type hasButton = true | false;

interface Props {
  title: string;
  hasBackButton?: hasButton;
}

export default function PageTitle({ title, hasBackButton }: Props) {
  function navigateToDashboard() {
    navigateTo("/dashboard");
  }

  if (hasBackButton) {
    return (
      <div className="head-btn">
        <BackButton onClick={navigateToDashboard} />

        <div className="page-title">
          <h1>{title}</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="page-title">
        <h1>{title}</h1>
      </div>
    );
  }
}
