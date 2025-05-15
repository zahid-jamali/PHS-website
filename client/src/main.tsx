import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/rtl.css";
import "./lib/i18n-fixed"; // Import fixed modular i18n configuration
import { icons } from "lucide-react";

// Create and render the root component
createRoot(document.getElementById("root")!).render(<App />);
