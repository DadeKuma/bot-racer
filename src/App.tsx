import React, { useEffect, useState } from "react";
import "./App.css";

type IssueData = {
  [submitter: string]: string;
};

const App: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [matchingTitles, setMatchingTitles] = useState<IssueData[]>([]);
  const [data, setData] = useState<IssueData[]>([]);

  const loadData = async () => {
    const findingsUrl = "/findings.json";
    try {
      const response = await fetch(findingsUrl);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error("Error loading and searching JSON file:", error);
    }
  };

  const handleSearch = () => {
    if (searchText === "") {
      setMatchingTitles([]);
      return;
    }

    const matchedTitles: IssueData[] = [];
    data.forEach((item) => {
      let matched = false;
      Object.entries(item).forEach(([, message]) => {
        if (message.toLowerCase().includes(searchText.toLowerCase())) {
          if (!matched) {
            matchedTitles.push(item);
            matched = true;
          }
        }
      });
    });

    setMatchingTitles(matchedTitles);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchText, data]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">Botrace Judging Helper</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchText}
          onChange={handleInputChange}
        />
      </div>
      <div className="results-container">
        {matchingTitles.length > 0 ? (
          matchingTitles.map((issue, idx) => (
            <div className="result-item" key={idx}>
              {Object.entries(issue).map(([submitter, message]) => (
                <div key={`${submitter}-${message}`}>
                  <p className="submitter">Bot: {submitter}</p>
                  <p className="message">{message}</p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
