import React, { useEffect, useState } from "react";
import styles from "../style/IssuesTab.module.scss";

type IssueData = {
  [submitter: string]: string;
};

const IssuesTab: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [matchingTitles, setMatchingTitles] = useState<IssueData[]>([]);
  const [data, setData] = useState<IssueData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const findingsUrl = "/data/findings.json";
      try {
        const response = await fetch(findingsUrl);
        const responseData = await response.json();
        setData(responseData);
        console.log(responseData);
      } catch (error) {
        console.error("Error loading and searching JSON file:", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
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
    handleSearch();
  }, [searchText, data]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  return (
    <div className={styles.duplicateTab}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.resultsContainer}>
        {matchingTitles.length > 0 ? (
          matchingTitles.map((issue, idx) => (
            <div className={styles.resultItem} key={idx}>
              {Object.entries(issue).map(([submitter, message]) => (
                <div key={`${submitter}-${message}`}>
                  <p className={styles.submitter}>Bot: {submitter}</p>
                  <p className={styles.message}>{message}</p>
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

export default IssuesTab;
