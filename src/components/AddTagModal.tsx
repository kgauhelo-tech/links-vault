import { useState, type FormEvent } from "react";
import "./new-link-styling.css";

interface AddTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTag: (tag: string) => void;
}

export default function AddTagModal({
  isOpen,
  onClose,
  onAddTag,
}: AddTagModalProps) {
  const [tagName, setTagName] = useState("");

  if (!isOpen) return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = tagName.trim();
    if (trimmed) {
      onAddTag(trimmed);
      setTagName("");
      onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>Add New Tag</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter tag name..."
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            autoFocus
          />
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-confirm">
              Add Tag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
