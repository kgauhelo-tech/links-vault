import "./dashboard-styling.css";

import "./navigation";
import {
  TotalLinksContainer,
  TotalFoldersContainer,
  ButtonsContainer,
} from "./GroupInfo";
import MostRecentLink from "./MostRecentLink";
import NavigationBar from "./NavigationItem";
import PageTitle from "./PageTitle";
import ScrollLinkItems from "./ScrollLinkItem";
import { DeleteLinksButton, NewLinkButton } from "./Buttons";
import { navigateTo } from "./navigation";
import Service from "../service/service";
import { useState } from "react";
import ActionHeader from "./ActionHeader";

export default function Dashboard() {
  const service = new Service();
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);
  const [links, setLinks] = useState(() => service.ReadAllLinks());
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const lastLink = links.length > 0 ? links[links.length - 1] : undefined;

  function createNewLink() {
    navigateTo("/addNewLink");
  }

  function handleLinkClick(id: string) {
    if (isSelectionMode) {
      // Toggle selection in selection mode
      setSelectedLinks((currentSelected) => {
        if (currentSelected.includes(id)) {
          return currentSelected.filter((selectedId) => selectedId !== id);
        }
        return [...currentSelected, id];
      });
    } else {
      // Navigate to Link Details page
      navigateTo(`/linkDetails?id=${id}`);
    }
  }

  function handleDeleteButtonClick(): void {
    if (!isSelectionMode) {
      // Step 1: Enable Selection Mode first
      setIsSelectionMode(true);
      return;
    }

    // Step 2: Confirm deletion if items are selected
    if (selectedLinks.length > 0) {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete ${selectedLinks.length} selected link(s)?`,
      );

      if (confirmDelete) {
        selectedLinks.forEach((id) => {
          service.deleteLink(id);
        });
        setLinks(service.ReadAllLinks());
        setSelectedLinks([]);
        setIsSelectionMode(false);
      }
    } else {
      // If nothing selected, just cancel Selection Mode
      setIsSelectionMode(false);
    }
  }

  return (
    <div className="content">
      <nav>
        <NavigationBar />
      </nav>

      <main>
        <header>
          <PageTitle title="LINKS VAULT" hasBackButton={false} />
        </header>

        <div
          onClick={() => {
            if (!isSelectionMode && lastLink?.id) {
              navigateTo(`/linkDetails?id=${lastLink.id}`);
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <MostRecentLink lastLink={lastLink} />
        </div>

        <div className="scrollable-links">
          <ScrollLinkItems
            links={links}
            onLinkClick={handleLinkClick}
            selectedLinks={selectedLinks}
            isSelectionMode={isSelectionMode}
          />
        </div>
      </main>

      <div className="group-info-container">
        <div className="group-info-container">
          <ActionHeader />
        </div>
        <TotalLinksContainer total={links.length} />
        <TotalFoldersContainer />

        <ButtonsContainer
          buttonPrimary={<NewLinkButton onClick={createNewLink} />}
          buttonSecondary={
            <DeleteLinksButton onClick={handleDeleteButtonClick} />
          }
        />

        {/* Active Selection Mode Indicator Banner */}
        {isSelectionMode && (
          <p className="selection-mode-hint">
            {selectedLinks.length} selected. Click items to toggle selection.
          </p>
        )}
      </div>
    </div>
  );
}
