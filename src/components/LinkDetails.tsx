import { Global, Copy } from "reicon-react";
import { useState } from "react";
import Service from "../service/service";
import "./link-details-styling.css";
import "./navigation";
import NavigationBar from "./NavigationItem";
import PageTitle from "./PageTitle";
import { BackButton, VisitLinkButton } from "./Buttons";
import { navigateTo } from "./navigation";
import ActionHeader from "./ActionHeader";

interface LinkDetailsProps {
  linkId?: string;
}

export default function LinkDetails({ linkId }: LinkDetailsProps) {
  const service = new Service();
  const [copied, setCopied] = useState(false);

  // Retrieve link using existing methods
  const allLinks = service.ReadAllLinks();
  const link = linkId
    ? allLinks.find((item: any) => item.id === linkId)
    : service.ReadLastLink();

  function handleBack() {
    navigateTo("/dashboard");
  }

  function handleEditLink() {
    navigateTo(`/editLink?id=${link?.id}`);
  }

  function handleVisitLink() {
    if (link?.url) {
      window.open(link.url, "_blank");
    }
  }

  function handleCopyUrl() {
    if (link?.url) {
      navigator.clipboard.writeText(link.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="content" id="linkDetails">
      <nav>
        <NavigationBar />
      </nav>

      <main>
        <header>
          <PageTitle title="Link Details" hasBackButton={true} />
        </header>

        {/* Main Details Card */}
        <div className="main-content">
          <div className="special-container">
            <div className="icon-container">
              <Global color="3D3B8E" size={150} />
            </div>

            <div className="details-header-text">
              <span className="subtitle">{link?.title || "W3Schools.com"}</span>
              <h2>{link?.title || "W3Schools.com"}</h2>
            </div>
          </div>

          <div className="details-section">
            <label className="details-label">URL</label>
            <div className="url-copy-row">
              <a
                href={link?.url}
                target="_blank"
                rel="noreferrer"
                className="link-url-text"
              >
                {link?.url || "https://www.w3schools.com/Html/"}
              </a>
              <button
                type="button"
                className="icon-copy-btn"
                onClick={handleCopyUrl}
                title="Copy URL"
              >
                <Copy size={18} />
              </button>
              {copied && <span className="copied-tooltip">Copied!</span>}
            </div>
          </div>

          <div className="details-section">
            <label className="details-label">DESCRIPTION</label>
            <p className="description-text">
              {link?.description ||
                "HTML is the standard markup language for Web pages. With HTML you can create your own Website."}
            </p>
          </div>
        </div>

        {/* Tags Row */}
        <div className="tags-container-row">
          {(link?.tags && link.tags.length > 0
            ? link.tags
            : ["Html", "Tag 2"]
          ).map((tag: string) => (
            <div key={tag} className="tag-card">
              <span className="tag-icon">🔗</span>
              <span className="tag-name">{tag}</span>
            </div>
          ))}
        </div>
      </main>

      <div className="group-info-container">
        <div className="group-info-container">
          <ActionHeader />
        </div>

        <div className="group-info">
          <h3>Date added</h3>
          <p className="total-number" style={{ fontSize: "1.2rem" }}>
            {link?.createdAt || "20/10/2026"}
          </p>
        </div>

        <div className="group-info">
          <h3>Folder</h3>
          <div className="folder-badge">
            <span>{link?.folder || "Resources"}</span>
          </div>
        </div>

        <div className="buttons-stack">
          <BackButton onClick={handleBack} />
          <button onClick={handleEditLink} className="secondary-button">
            EDIT LINK
          </button>
          <VisitLinkButton onClick={handleVisitLink} />
        </div>
      </div>
    </div>
  );
}
