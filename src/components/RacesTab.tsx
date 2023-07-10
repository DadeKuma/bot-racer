import React, { useEffect, useState } from "react";
import Select from "react-select";
import { selectStyle } from "../customStyle";
import styles from "../style/RacesTab.module.scss";
import { Option, RaceData } from "../types";

const RacesTab: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [entries, setEntries] = useState<Option[]>([]);
  const [racesData, setRacesData] = useState<RaceData[]>([]);

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

  const handleSelectChange = (option: Option | null) => {
    setSelectedOption(option);
  };

  const renderStatistics = (selectedRace: RaceData | null | undefined) => {
    if (!selectedRace) {
      return null;
    }

    const { data } = selectedRace;

    return (
      <div className={styles.ranksList}>
        <div className={styles.ranksListItem}>
          <p className={styles.ranksListItemTitle}>👑 Winner</p>
          <p className={styles.ranksListItemNames}>
            {data.winner.join(", ")}
          </p>
        </div>
        <div className={styles.ranksListItem}>
          <p className={styles.ranksListItemTitle}>A Ranks</p>
          <p className={styles.ranksListItemNames}>{data.A.join(", ")}</p>
        </div>
        <div className={styles.ranksListItem}>
          <p className={styles.ranksListItemTitle}>B Ranks</p>
          <p className={styles.ranksListItemNames}>{data.B.join(", ")}</p>
        </div>
        <div className={styles.ranksListItem}>
          <p className={styles.ranksListItemTitle}>C Ranks</p>
          <p className={styles.ranksListItemNames}>{data.C.join(", ")}</p>
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
