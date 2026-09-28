import { Add, ArrowUpRight, DownloadSquare, Reply, Trash2 } from "reicon-react";

interface Props {
  onClick: () => void;
}

function NewLinkButton({ onClick }: Props) {
  return (
    <>
      <button onClick={onClick} className="primary-button">
        <Add />
        ADD NEW LINKS
      </button>
    </>
  );
}

function DeleteLinksButton({ onClick }: Props) {
  return (
    <>
      <button onClick={onClick} className="secondary-button">
        <Trash2 />
        DELETE LINKS
      </button>
    </>
  );
}

function DeleteLinkButton({ onClick }: Props) {
  return (
    <>
      <button onClick={onClick} className="secondary-button">
        <Trash2 />
        DELETE LINK
      </button>
    </>
  );
}

function BackButton({ onClick }: Props) {
  return (
    <div>
      <button onClick={onClick} className="secondary-button">
        <div>
          <Reply weight="Outline" />
        </div>
        BACK
      </button>
    </div>
  );
}

function NewTagButton({ onClick }: Props) {
  return (
    <>
      <button onClick={onClick} className="secondary-button">
        <Add />
        ADD NEW TAG
      </button>
    </>
  );
}

function SaveLinkButton({ onClick }: Props) {
  return (
    <>
      <button onClick={onClick} className="primary-button">
        <DownloadSquare weight="Outline" />
        SAVE LINK
      </button>
    </>
  );
}

function VisitLinkButton({ onClick }: Props) {
  return (
    <>
      <button onClick={onClick} className="primary-button">
        <ArrowUpRight weight="Outline" />
        VISIT LINK
      </button>
    </>
  );
}

export {
  SaveLinkButton,
  NewTagButton,
  NewLinkButton,
  BackButton,
  DeleteLinkButton,
  DeleteLinksButton,
  VisitLinkButton,
};
