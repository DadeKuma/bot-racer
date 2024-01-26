import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { selectStyle } from "../customStyle";
import { getAllYearsUntilNow } from "../dateUtils";
import styles from "../style/RacesTab.module.scss";
import { Option, RaceData, TabProps } from "../types";
import RaceResults from "./subcomponents/RaceResults";
import YearSelection from "./subcomponents/YearSelection";

const RacesTab: React.FC<TabProps> = ({ handleTabChange, handleYearChange, currentYear }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [entries, setEntries] = useState<Option[]>([]);
  const [racesData, setRacesData] = useState<Map<string, RaceData[]>>(new Map<string, RaceData[]>());
  const [selectedRaceYear, setSelectedRaceYear] = useState<RaceData[]>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const raceMapByYear = new Map<string, RaceData[]>();
      Promise.all(getAllYearsUntilNow().map(async year => {
        let raceData: RaceData[];
        try {
          const response = await fetch(`/data/races/${year}.json`);
          raceData = await response.json();
        } catch (error) {
          return console.error(`Error fetching race data for year ${year}: ${error}`);
        }
        raceMapByYear.set(year, raceData);
      })).then(() => setRacesData(raceMapByYear));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const data = racesData.get(currentYear) || [];
      const selectedRace = data.find(race => race.name === searchQuery);
      if (selectedRace) {
        setSelectedOption({ value: selectedRace.name, label: selectedRace.name.replace(/-/g, " ").toUpperCase() });
      }
    }
  }, [searchQuery, racesData, currentYear]);

  useEffect(() => {
    const data = racesData.get(currentYear) || [];
    const options = [...data].reverse().map((race) => ({
      value: race.name,
      label: race.name.replace(/-/g, " ").toUpperCase(),
    }));
    setSelectedRaceYear(data);
    setEntries(options);
  }, [racesData, currentYear]);

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
      <YearSelection onSelectYear={handleYearChange} selectedYear={currentYear} />
      <Select
        options={entries}
        value={selectedOption}
        onChange={handleSelectChange}
        placeholder="Select a race"
        styles={selectStyle}
      />
      <div className={styles.statistics}>
        <RaceResults race={selectedRaceYear.find((race) => race.name === selectedOption?.value)} handleTabChange={handleTabChange} />
      </div>
    </div>
  );
};

export default RacesTab;
