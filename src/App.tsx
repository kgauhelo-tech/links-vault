import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AddNewLink from "./components/AddNewLink";
import LinkDetails from "./components/LinkDetails";
import EditExistingLink from "./components/EditExistinglink";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const queryParams = new URLSearchParams(window.location.search);
  const selectedLinkId = queryParams.get("id") || undefined;

  let Component: React.JSX.Element;

  switch (currentPath) {
    case "/dashboard":
    case "/":
      Component = <Dashboard />;
      break;

    case "/addNewLink":
      Component = <AddNewLink />;
      break;

    case "/linkDetails":
      Component = <LinkDetails linkId={selectedLinkId} />;
      break;

    case "/editLink":
      Component = <EditExistingLink linkId={selectedLinkId} />;
      break;

    default:
      Component = <Dashboard />;
      break;
  }

  return <>{Component}</>;
}

export default App;
