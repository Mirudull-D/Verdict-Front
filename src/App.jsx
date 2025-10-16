import { useState } from "react";
import LandingPage from "./components/LandingPage";
import UnifiedLegalApp from "./components/UnifiedLegalApp";
import "./App.css";

function App() {
  const [showDemo, setShowDemo] = useState(false);
  const [language, setLanguage] = useState("english");

  if (showDemo) {
    return (
      <div className="demo-container">
        <button className="back-button" onClick={() => setShowDemo(false)}>
          ← Back to Home
        </button>
        <UnifiedLegalApp language={language} />
      </div>
    );
  }

  return (
    <LandingPage
      onTryDemo={() => setShowDemo(true)}
      language={language}
      onLanguageChange={setLanguage}
    />
  );
}

export default App;
