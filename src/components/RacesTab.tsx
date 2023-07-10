import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { selectStyle } from "../customStyle";
import styles from "../style/RacesTab.module.scss";
import { Option, RaceData, TabProps } from "../types";

const RacesTab: React.FC<TabProps> = ({ handleTabChange }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [entries, setEntries] = useState<Option[]>([]);
  const [racesData, setRacesData] = useState<RaceData[]>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("/data/races.json");
      const data: RaceData[] = await response.json();
      setRacesData(data);

      const options = data.reverse().map((race) => ({
        value: race.name,
        label: race.name.replace(/-/g, " ").toUpperCase(),
      }));

      setEntries(options);
    } catch (error) {
      console.error("Error fetching race data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const selectedRace = racesData.find((race) => race.name === searchQuery);
      if (selectedRace) {
        setSelectedOption({ value: selectedRace.name, label: selectedRace.name.replace(/-/g, " ").toUpperCase() });
      }
    }
  }, [searchQuery, racesData]);

  const handleSelectChange = (option: Option | null) => {
    if (selectedOption && option && selectedOption.value === option.value) {
      return;
    }
    setSelectedOption(option);

    const newSearchQuery = option ? option.value : "";
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("search", newSearchQuery);
    navigate(`?${newSearchParams.toString()}`);
  };

  const renderStatistics = (selectedRace: RaceData | null | undefined) => {
    if (!selectedRace) {
      return null;
    }

    const { data } = selectedRace;

    const renderBotLinks = (bots: string[]) =>
      bots.map((bot) => (
        <Link
          to={`/bots?search=${encodeURIComponent(bot)}`}
          key={bot}
          className={styles.botLink}
          onClick={() => handleTabChange("/bots")}
        >
          {bot}
        </Link>
      ));

    return (
      <div className={styles.ranksList}>
        <div className={styles.ranksListItem}>
          <p className={styles.ranksListItemTitle}>👑 Winner</p>
          <p className={styles.ranksListItemNames}>
            {renderBotLinks(data.winner)}
          </p>
        </div>
        <div className={styles.ranksListItem}>
          <p className={styles.ranksListItemTitle}>A Ranks</p>
          <p className={styles.ranksListItemNames}>
            {renderBotLinks(data.A)}
          </p>
        </div>
        <div className={styles.ranksListItem}>
          <p className={styles.ranksListItemTitle}>B Ranks</p>
          <p className={styles.ranksListItemNames}>
            {renderBotLinks(data.B)}
          </p>
        </div>
        <div className={styles.ranksListItem}>
          <p className={styles.ranksListItemTitle}>C Ranks</p>
          <p className={styles.ranksListItemNames}>
            {renderBotLinks(data.C)}
          </p>
        </div>
      </div>
    );
  };


  return (
    <div className={styles.statsTab}>
      <Select
        options={entries}
        value={selectedOption}
        onChange={handleSelectChange}
        placeholder="Select a race"
        styles={selectStyle}
      />
      <div className={styles.statistics}>
        {renderStatistics(
          racesData.find((race) => race.name === selectedOption?.value)
        )}
      </div>
    </div>
  );
};

export default RacesTab;
