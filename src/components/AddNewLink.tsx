import { Global } from "reicon-react";
import Service from "../service/service";
import { useState } from "react";
import {
  ButtonsContainer,
  TotalFoldersContainer,
  TotalLinksContainer,
} from "./GroupInfo";

import "./new-link-styling.css";

import "./navigation.ts";
import NavigationBar from "./NavigationItem";
import PageTitle from "./PageTitle.tsx";
import TextInputField from "./TextInputField.tsx";
import { NewTagButton, SaveLinkButton } from "./Buttons.tsx";
import AddTagModal from "./AddTagModal.tsx";
import ActionHeader from "./ActionHeader.tsx";

export default function AddNewLink() {
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  const [linkTags, setLinkTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newLink = new Service();

  function handleSaveNewLink() {
    if (
      linkTitle.length > 0 &&
      linkUrl.length > 0 &&
      linkDescription.length > 0
    ) {
      newLink.Create(linkTitle, linkDescription, linkUrl, linkTags);
    }
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleAddTag(newTag: string) {
    if (!linkTags.includes(newTag)) {
      setLinkTags([...linkTags, newTag]);
    }
  }

  function handleRemoveTag(tagToRemove: string) {
    setLinkTags(linkTags.filter((tag) => tag !== tagToRemove));
  }

  return (
    <>
      <div className="content" id="addNewLink">
        <nav>
          <NavigationBar />
        </nav>

        <main>
          <header>
            <PageTitle title="Add link to vault" hasBackButton={true} />
          </header>

          {/* Main Card: Title, URL, Description */}
          <div className="main-content">
            <div className="special-container">
              <div className="icon-container">
                <Global color="3D3B8E" size={150} />
              </div>

              <div className="title-url">
                <div className="title-input">
                  <TextInputField
                    inputValue={"title"}
                    value={linkTitle}
                    onChange={setLinkTitle}
                    label={"TITLE"}
                  />
                </div>

                <TextInputField
                  inputValue={"url"}
                  value={linkUrl}
                  onChange={setLinkUrl}
                  label={"URL"}
                />
              </div>
            </div>

            <div className="input">
              <TextInputField
                inputValue={"description"}
                value={linkDescription}
                onChange={setLinkDescription}
                label={"DESCRIPTION"}
              />
            </div>
          </div>

          {/* Tag Row: Placed below main-content card in its own layout block */}
          <div className="tags-container-row">
            {linkTags.map((tag) => (
              <div key={tag} className="tag-card">
                <span className="tag-icon">🔗</span>
                <span className="tag-name">{tag}</span>
                <button
                  type="button"
                  className="remove-tag-x"
                  onClick={() => handleRemoveTag(tag)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </main>

        <div className="group-info-container">
          <div className="group-info-container">
            <ActionHeader />
          </div>

          <TotalLinksContainer total={Number(newLink.GetLength())} />
          <TotalFoldersContainer />
          <ButtonsContainer
            buttonPrimary={<SaveLinkButton onClick={handleSaveNewLink} />}
            buttonSecondary={<NewTagButton onClick={handleOpenModal} />}
          />
        </div>
      </div>

      {/* Modal overlay */}
      <AddTagModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddTag={handleAddTag}
      />
    </>
  );
}
