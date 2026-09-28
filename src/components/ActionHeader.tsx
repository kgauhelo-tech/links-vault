import { useState } from "react";
import { Filter, Search, Lamp } from "reicon-react";
import Service from "../service/service";
import { navigateTo } from "./navigation";

export default function ActionHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const service = new Service();
  const allLinks = service.ReadAllLinks();

  // Toggle Theme (Light <-> Dark)
  function handleToggleTheme() {
    document.body.classList.toggle("dark-theme");
  }

  // Filter links for Search Modal
  const filteredLinks = searchTerm.trim()
    ? allLinks.filter(
        (link: any) =>
          link.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          link.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  return (
    <>
      <div className="actions">
        <div className="action" title="Filter Links">
          <Filter size={28} />
        </div>
        <div
          className="action"
          title="Search Links"
          onClick={() => setIsSearchOpen(true)}
          style={{ cursor: "pointer" }}
        >
          <Search size={28} />
        </div>
        <div
          className="action"
          title="Toggle Dark Mode"
          onClick={handleToggleTheme}
          style={{ cursor: "pointer" }}
        >
          <Lamp weight="Filled" size={28} />
        </div>
      </div>

      {/* Quick Search Modal */}
      {isSearchOpen && (
        <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
          <div
            className="search-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Search Links Vault</h3>
            <input
              type="text"
              placeholder="Type title or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />

            <div className="search-results-list">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link: any) => (
                  <div
                    key={link.id}
                    className="search-result-item"
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo(`/linkDetails?id=${link.id}`);
                    }}
                  >
                    <div>
                      <strong>{link.title}</strong>
                      <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                        {link.url}
                      </p>
                    </div>
                    <span>→</span>
                  </div>
                ))
              ) : (
                <p
                  style={{
                    opacity: 0.6,
                    textAlign: "center",
                    padding: "12px 0",
                  }}
                >
                  {searchTerm
                    ? "No matching links found."
                    : "Start typing to search..."}
                </p>
              )}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setIsSearchOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
