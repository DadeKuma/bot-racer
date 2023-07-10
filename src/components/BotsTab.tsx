import React, { useEffect, useState } from "react";
import Select from "react-select";
import { animated, useSpring } from "react-spring";
import { selectStyle } from "../customStyle";
import styles from "../style/BotsTab.module.scss";
import { BotStats, Option, RaceData } from "../types";

const BotsTab: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [entries, setEntries] = useState<Option[]>([]);
  const [botStats, setBotStats] = useState<BotStats[]>([]);

  const incrementBotStat = (
    botStatsMap: Map<string, BotStats>,
    bot: string,
    statKey: keyof BotStats
  ) => {
    const botStat = botStatsMap.get(bot);
    if (botStat) {
      (botStat[statKey] as number) += 1;
    } else {
      botStatsMap.set(bot, {
        bot,
        winner: 0,
        A: 0,
        B: 0,
        C: 0,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/races.json");
        const data: RaceData[] = await response.json();

        const botStatsMap = new Map<string, BotStats>();

        data.forEach((race) => {
          const { winner, A, B, C } = race.data;

          winner.forEach((bot) => incrementBotStat(botStatsMap, bot, "winner"));
          A.forEach((bot) => incrementBotStat(botStatsMap, bot, "A"));
          B.forEach((bot) => incrementBotStat(botStatsMap, bot, "B"));
          C.forEach((bot) => incrementBotStat(botStatsMap, bot, "C"));
        });

        const botStatsArr = Array.from(botStatsMap.values());
        setBotStats(botStatsArr);

        const options = botStatsArr.map((stats) => ({
          value: stats.bot,
          label: stats.bot,
        }));

        setEntries(options);
      } catch (error) {
        console.error("Error fetching race data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (option: Option | null) => {
    setSelectedOption(option);
  };

  const AnimatedNumber: React.FC<{ value: number; }> = ({ value }) => {
    const numberProps = useSpring({ value, from: { value: 0 } });

    return (
      <animated.span>
        {numberProps.value.interpolate((val) => val.toFixed(0))}
      </animated.span>
    );
  };

  const renderDashboard = (selectedBot: BotStats | null | undefined) => {
    if (!selectedBot) {
      return null;
    }

    const { bot, winner, A, B, C } = selectedBot;

    return (
      <div className={styles.dashboard}>
        <h3>{bot}</h3>
        <div className={styles.statBubbles}>
          <div className={styles.statBubble}>
            <p>Winner</p>
            <AnimatedNumber value={winner} />
          </div>
          <div className={styles.statBubble}>
            <p>A Ranks</p>
            <AnimatedNumber value={A} />
          </div>
          <div className={styles.statBubble}>
            <p>B Ranks</p>
            <AnimatedNumber value={B} />
          </div>
          <div className={styles.statBubble}>
            <p>C Ranks</p>
            <AnimatedNumber value={C} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.botsTab}>
      <Select
        options={entries}
        value={selectedOption}
        onChange={handleSelectChange}
        placeholder="Select a bot"
        styles={selectStyle}
      />
      {renderDashboard(
        botStats.find((stats) => stats.bot === selectedOption?.value)
      )}
    </div>
  );
};

export default BotsTab;
