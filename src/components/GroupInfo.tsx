import "./small-components-styling.css";

interface TotalLinksContainerProps {
  total: number;
}

export function TotalLinksContainer({ total }: TotalLinksContainerProps) {
  return (
    <div className="group-info">
      <h3>Total Links</h3>
      <p className="total-number">{total}</p>
    </div>
  );
}

export function TotalFoldersContainer() {
  let total: number | 0;
  return (
    <>
      <div className="group-info">
        <h3>Total Folders</h3>
        <p className="total-number">{total!}</p>
      </div>
    </>
  );
}

interface Props {
  buttonPrimary: React.JSX.Element;
  buttonSecondary: React.JSX.Element;
}

export function ButtonsContainer(props: Props) {
  return (
    <>
      <div className="group-info">
        {props.buttonSecondary}
        {props.buttonPrimary}
      </div>
    </>
  );
}
