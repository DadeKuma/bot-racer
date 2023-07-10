import React, { useState } from "react";
import IssuesTab from "./components/IssuesTab";
import RacesTab from "./components/RacesTab";
import "./style/App.scss";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("duplicateFinder");

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container">
      <h1 className="title">🤖 Bot Racer 🏁</h1>
      <div className="tabContainer">
        <div
          className={`tab ${activeTab === "issues" ? "active" : ""}`}
          onClick={() => handleTabChange("issues")}
        >
          Issues
        </div>
        <div
          className={`tab ${activeTab === "races" ? "active" : ""}`}
          onClick={() => handleTabChange("races")}
        >
          Races
        </div>
      </div>
      <div className="contentContainer">
        {activeTab === "issues" ? (
          <IssuesTab />
        ) : (
          <RacesTab />
        )}
      </div>
    </div>
  );
};

export default App;
