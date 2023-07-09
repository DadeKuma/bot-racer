import React, { useState } from "react";
import "./App.css";
import DuplicateFinderTab from "./components/DuplicateFinderTab";
import RacesTab from "./components/RacesTab";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("duplicateFinder");

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container">
      <h1 className="title">🤖 Bot Racer 🏁 </h1>
      <div className="tab-container">
        <div
          className={`tab ${activeTab === "duplicateFinder" ? "active" : ""}`}
          onClick={() => handleTabChange("duplicateFinder")}
        >
          Duplicate Finder
        </div>
        <div
          className={`tab ${activeTab === "races" ? "active" : ""}`}
          onClick={() => handleTabChange("races")}
        >
          Races
        </div>
      </div>
      <div className="content-container">
        {activeTab === "duplicateFinder" ? (
          <DuplicateFinderTab />
        ) : (
          <RacesTab />
        )}
      </div>
    </div>
  );
};

export default App;
