import { useState } from "react";
import "./new-link-styling.css";
import NavigationBar from "./NavigationItem";
import PageTitle from "./PageTitle";
import TextInputField from "./TextInputField";
import AddTagModal from "./AddTagModal";
import { SaveLinkButton, NewTagButton } from "./Buttons";
import Service from "../service/service";
import { navigateTo } from "./navigation";
import ActionHeader from "./ActionHeader";

interface EditExistingLinkProps {
  linkId?: string;
}

export default function EditExistingLink({ linkId }: EditExistingLinkProps) {
  const service = new Service();
  const allLinks = service.ReadAllLinks();

  const existingLink = linkId
    ? allLinks.find((item: any) => item.id === linkId)
    : service.ReadLastLink();

  const [title, setTitle] = useState(existingLink?.title || "");
  const [url, setUrl] = useState(existingLink?.url || "");
  const [description, setDescription] = useState(
    existingLink?.description || "",
  );
  const [tags, setTags] = useState<string[]>(existingLink?.tags || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSaveLink() {
    if (!title || !url) {
      alert("Please enter both Title and URL.");
      return;
    }

    if (service.updateLink) {
      service.updateLink(existingLink.id, title, description, url, tags);
    }

    navigateTo(`/linkDetails?id=${existingLink?.id}`);
  }

  function handleAddTag(newTag: string) {
    if (!tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
    }
  }

  function handleRemoveTag(tagToRemove: string) {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  }

  return (
    <div className="content">
      <nav>
        <NavigationBar />
      </nav>

      <main>
        <header>
          <PageTitle title="EDIT LINK" hasBackButton={true} />
        </header>

        <div className="main-content">
          <div className="title-url">
            <TextInputField
              label="TITLE"
              inputValue="title"
              value={title}
              onChange={setTitle}
            />
            <TextInputField
              label="URL"
              inputValue="url"
              value={url}
              onChange={setUrl}
            />
            <TextInputField
              label="DESCRIPTION"
              inputValue="description"
              value={description}
              onChange={setDescription}
            />
          </div>
        </div>

        {/* Existing & New Tags Section */}
        <div className="tags-container-row">
          {tags.map((tag) => (
            <div key={tag} className="tag-card">
              <span className="tag-name">{tag}</span>
              <button
                type="button"
                className="remove-tag-x"
                onClick={() => handleRemoveTag(tag)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </main>

      <div className="group-info-container">
        <div className="group-info-container">
          <ActionHeader />
        </div>

        <div className="buttons-stack">
          <NewTagButton onClick={() => setIsModalOpen(true)} />
          <SaveLinkButton onClick={handleSaveLink} />
        </div>
      </div>

      <AddTagModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTag={handleAddTag}
      />
    </div>
  );
}
