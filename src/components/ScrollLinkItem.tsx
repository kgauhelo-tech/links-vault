import "./small-components-styling.css";
import { ArrowRightUp, Global } from "reicon-react";

type ScrollLinkItemsProps = {
  links: any[];
  onLinkClick: (id: string) => void;
  selectedLinks: string[];
  isSelectionMode: boolean;
};

export default function ScrollLinkItems({
  links,
  onLinkClick,
  selectedLinks,
  isSelectionMode,
}: ScrollLinkItemsProps) {
  const otherLinks = links.slice(0, -1);

  if (otherLinks.length === 0) {
    return (
      <div className="empty-list">
        {links.length === 0
          ? "No additional links in list."
          : "Only 1 link saved — featured above!"}
      </div>
    );
  }

  return (
    <>
      {otherLinks.map((link: any) => {
        const isSelected = selectedLinks.includes(link.id);

        return (
          <div
            key={link.id}
            className={`list-item-container ${isSelected ? "selected-item" : ""}`}
            onClick={() => onLinkClick(link.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="first-group">
              {isSelectionMode ? (
                <div
                  className={`checkbox-circle ${isSelected ? "checked" : ""}`}
                >
                  {isSelected && "✓"}
                </div>
              ) : (
                <Global size={16} />
              )}
              <p>{link.title}</p>
            </div>

            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowRightUp size={16} />
            </a>
          </div>
        );
      })}
    </>
  );
}
