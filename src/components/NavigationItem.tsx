import "./small-components-styling.css";
import { Add, FolderAdd, Home } from "reicon-react";
import { navigateTo } from "./navigation";

export default function NavigationBar() {
  const currentPath = window.location.pathname;

  function handleHome() {
    navigateTo("/dashboard");
  }

  function handleNewLink() {
    navigateTo("/addNewLink");
  }

  return (
    <div className="nav-container">
      <div
        className={`nav-item ${currentPath === "/" || currentPath === "/dashboard" ? "active" : ""}`}
        onClick={handleHome}
        title="Dashboard"
      >
        <Home size={24} weight="Filled" />
      </div>

      <div
        className={`nav-item ${currentPath === "/addNewLink" ? "active" : ""}`}
        onClick={handleNewLink}
        title="Add Link"
      >
        <Add size={24} />
      </div>

      <div className="nav-item" title="Folders">
        <FolderAdd size={24} />
      </div>

      <div className="nav-item" title="Archive">
        <FolderAdd size={24} />
      </div>
    </div>
  );
}
