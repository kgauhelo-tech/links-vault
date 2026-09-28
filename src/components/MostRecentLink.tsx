import "./most-recent-styling.css";
import { ArrowUpRight, Global } from "reicon-react";

interface MostRecentLinkProps {
  lastLink?: {
    title: string;
    url: string;
    description: string;
  };
}

export default function MostRecentLink({ lastLink }: MostRecentLinkProps) {
  if (!lastLink) {
    return (
      <div className="most-recent empty-vault">
        <div className="icon-container">
          <Global color="#3D3B8E" size={64} />
        </div>
        <div className="link-info">
          <h2 className="link-title">Your Vault is Empty</h2>
          <p className="link-description">
            No links added yet. Click the <strong>+</strong> button to save your
            first link!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="most-recent">
      <div className="icon-container">
        <Global color="#3D3B8E" size={64} />
      </div>

      <div className="link-info">
        <div className="link-header">
          <h2 className="link-title">{lastLink.title}</h2>
          <a
            href={lastLink.url}
            target="_blank"
            rel="noreferrer"
            className="external-link-btn"
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowUpRight size={20} />
          </a>
        </div>

        <p className="link-url-text">{lastLink.url}</p>
        <p className="link-description">{lastLink.description}</p>
      </div>
    </div>
  );
}
