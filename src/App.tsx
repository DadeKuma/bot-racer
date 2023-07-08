import React, { useState } from "react";
import "./App.css";
import DuplicateFinderTab from "./components/DuplicateFinderTab";
import StatsTab from "./components/StatsTab";

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
          className={`tab ${activeTab === "statistics" ? "active" : ""}`}
          onClick={() => handleTabChange("statistics")}
        >
          Statistics
        </div>
      </div>
      <div className="content-container">
        {activeTab === "duplicateFinder" ? (
          <DuplicateFinderTab />
        ) : (
          <StatsTab />
        )}
      </div>
    </div>
  );
};

export default App;
