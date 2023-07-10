import React, { useEffect, useState } from "react";
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BotsTab from "./components/BotsTab";
import IssuesTab from "./components/IssuesTab";
import LeaderboardTab from "./components/LeaderboardTab";
import RacesTab from "./components/RacesTab";
import "./style/App.scss";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    setActiveTab(window.location.pathname);
  }, []);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <Router>
      <div className="container">
        <h1 className="title">🤖 Bot Racer 🏁</h1>
        <div className="tabContainer">
          <Link
            to="/issues"
            className={`tab ${activeTab === "/issues" ? "active" : ""}`}
            onClick={() => handleTabChange("/issues")}
          >
            Issues
          </Link>
          <Link
            to="/races"
            className={`tab ${activeTab === "/races" ? "active" : ""}`}
            onClick={() => handleTabChange("/races")}
          >
            Races
          </Link>
          <Link
            to="/bots"
            className={`tab ${activeTab === "/bots" ? "active" : ""}`}
            onClick={() => handleTabChange("/bots")}
          >
            Bots
          </Link>
          <Link
            to="/leaderboard"
            className={`tab ${activeTab === "/leaderboard" ? "active" : ""}`}
            onClick={() => handleTabChange("/leaderboard")}
          >
            Leaderboard
          </Link>
        </div>
        <div className="contentContainer">
          <Routes>
            <Route
              path="/issues"
              element={<IssuesTab handleTabChange={handleTabChange} />}
            />
            <Route
              path="/races"
              element={<RacesTab handleTabChange={handleTabChange} />}
            />
            <Route
              path="/bots"
              element={<BotsTab handleTabChange={handleTabChange} />}
            />
            <Route
              path="/leaderboard"
              element={<LeaderboardTab handleTabChange={handleTabChange} />}
            />
            <Route path="/" element={<Navigate to="/issues" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
