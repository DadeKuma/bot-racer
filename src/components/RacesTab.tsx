import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { selectStyle } from "../customStyle";
import styles from "../style/RacesTab.module.scss";
import { Option, RaceData, TabProps } from "../types";
import RaceResults from "./subcomponents/RaceResults";

const RacesTab: React.FC<TabProps> = ({ handleTabChange }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [entries, setEntries] = useState<Option[]>([]);
  const [racesData, setRacesData] = useState<RaceData[]>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  const navigate = useNavigate();

  useEffect(() => {
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
        <RaceResults race={racesData.find((race) => race.name === selectedOption?.value)} handleTabChange={handleTabChange} />
      </div>
    </div>
  );
};

export default RacesTab;
