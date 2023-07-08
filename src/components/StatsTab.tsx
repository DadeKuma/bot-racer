import React, { useState } from "react";
import Select from "react-select";


type Option = {
  value: string;
  label: string;
};

const options: Option[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const StatsTab: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const handleSelectChange = (option: any) => {
    setSelectedOption(option);
  };

  let statistics: React.ReactNode = null;

  switch (selectedOption?.value) {
    case "option1":
      statistics = <p>Statistics for Option 1</p>;
      break;
    case "option2":
      statistics = <p>Statistics for Option 2</p>;
      break;
    case "option3":
      statistics = <p>Statistics for Option 3</p>;
      break;
    default:
      statistics = <p>Please select an option.</p>;
  }

  return (
    <div className="stats-tab">
      <Select
        value={selectedOption}
        onChange={handleSelectChange}
        options={options}
        placeholder="Select an option"
      />
      <div className="statistics">{statistics}</div>
    </div>
  );
};

export default StatsTab;
