import React, { useEffect, useState } from "react";
import Select from "react-select";
import "../style/StatsTab.css";

type Option = {
  value: string;
  label: string;
};

type RaceData = {
  name: string;
  data: {
    winner: string[];
    A: string[];
    B: string[];
    C: string[];
    prize: {
      winner: number;
      A: number;
      B: number;
    };
  };
};

const selectStyle = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: 0,
    borderColor: state.isFocused ? '#ffcc00' : provided.borderColor,
    backgroundColor: "#444",
    color: state.selectProps.inputValue ? '#fff' : '#444',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#ffcc00' : "#555",
    color: "#fff",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  noOptionsMessage: (provided: any) => ({
    ...provided,
    backgroundColor: "#555",
    color: "#fff",
  }),
  menu: (provided: any) => ({
    ...provided,
    background: "#444"
  }),
};


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
    if (selectedRace === undefined) {
      return <p>Please select a race.</p>;
    }

    if (selectedRace === null) {
      return null;
    }

    const { data } = selectedRace;

    return (
      <div className="ranks-list">
        <div className="ranks-list-item">
          <p className="ranks-list-item-title">👑 Winner</p>
          <p className="ranks-list-item-names winner-list">
            {data.winner.join(", ")}
          </p>
        </div>
        <div className="ranks-list-item">
          <p className="ranks-list-item-title">A Ranks</p>
          <p className="ranks-list-item-names">{data.A.join(", ")}</p>
        </div>
        <div className="ranks-list-item">
          <p className="ranks-list-item-title">B Ranks</p>
          <p className="ranks-list-item-names">{data.B.join(", ")}</p>
        </div>
        <div className="ranks-list-item">
          <p className="ranks-list-item-title">C Ranks</p>
          <p className="ranks-list-item-names">{data.C.join(", ")}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="stats-tab">
      <Select
        options={entries}
        value={selectedOption}
        onChange={handleSelectChange}
        placeholder="Select a race"
        styles={selectStyle}
      />
      <div className="statistics">
        {renderStatistics(
          racesData.find((race) => race.name === selectedOption?.value)
        )}
      </div>
    </div>
  );
};

export default RacesTab;
