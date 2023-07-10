import React, { useState } from "react";
import IssuesTab from "./components/IssuesTab";
import RacesTab from "./components/RacesTab";
import "./style/App.scss";
import LeaderboardTab from "./components/LeaderboardTab";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("issues");

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const getTab = (name: string) => {
    switch (name) {
      case "issues":
        return <IssuesTab />;
      case "races":
        return <RacesTab />;
      case "leaderboard":
        return <LeaderboardTab />;
    }
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
        <div
          className={`tab ${activeTab === "leaderboard" ? "active" : ""}`}
          onClick={() => handleTabChange("leaderboard")}
        >
          Leaderboard
        </div>
      </div>
      <div className="contentContainer">
        {getTab(activeTab)}
      </div>
    </div>
  );
};

export default App;
