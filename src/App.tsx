import React, { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BotsTab from "./components/BotsTab";
import IssuesTab from "./components/IssuesTab";
import LeaderboardTab from "./components/LeaderboardTab";
import RacesTab from "./components/RacesTab";
import "./style/App.scss";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("issues");

  return (
    <Router>
      <div className="container">
        <h1 className="title">🤖 Bot Racer 🏁</h1>
        <div className="tabContainer">
          <Link
            to="/issues"
            className={`tab ${activeTab === "issues" ? "active" : ""}`}
            onClick={() => setActiveTab("issues")}
          >
            Issues
          </Link>
          <Link
            to="/races"
            className={`tab ${activeTab === "races" ? "active" : ""}`}
            onClick={() => setActiveTab("races")}
          >
            Races
          </Link>
          <Link
            to="/bots"
            className={`tab ${activeTab === "bots" ? "active" : ""}`}
            onClick={() => setActiveTab("bots")}
          >
            Bots
          </Link>
          <Link
            to="/leaderboard"
            className={`tab ${activeTab === "leaderboard" ? "active" : ""}`}
            onClick={() => setActiveTab("leaderboard")}
          >
            Leaderboard
          </Link>
        </div>
        <div className="contentContainer">
          <Routes>
            <Route path="/issues" element={<IssuesTab />} />
            <Route path="/races" element={<RacesTab />} />
            <Route path="/bots" element={<BotsTab />} />
            <Route path="/leaderboard" element={<LeaderboardTab />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
