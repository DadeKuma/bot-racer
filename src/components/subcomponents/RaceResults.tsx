import React from "react";
import { Link } from "react-router-dom";
import styles from "../../style/RaceResults.module.scss";
import { RaceData } from "../../types";

interface RaceResultsProps {
    race: RaceData | undefined;
    handleTabChange: (path: string) => void;
}

const RaceResults: React.FC<RaceResultsProps> = ({ race, handleTabChange }) => {
    if (!race) {
        return null;
    }

    const { data } = race;

    const renderBotLinks = (bots: string[], rowName: string) => {
        const botElements = bots.map((bot) => (
            <Link
                to={`/bots?search=${encodeURIComponent(bot)}`}
                key={bot}
                onClick={() => handleTabChange("/bots")}
                className={styles.botLink}
            >
                {bot}
            </Link>
        ));

        return (
            <div className={styles.botRow}>
                <p className={styles.rowName}>{rowName}</p>
                <div className={styles.botLinks}>{botElements}</div>
            </div>
        );
    };

    const renderJudgeName = (judge: string, rowName: string) => {
        const judgeElement = <div className={styles.judgeLink} >{judge}</div>;
        return (
            <div className={styles.botRow}>
                <p className={styles.rowName}>{rowName}</p>
                <div className={styles.botLinks}>{judgeElement}</div>
            </div>
        );
    };

    return (
        <div className={styles.raceResults}>
            {renderJudgeName(data.judge, "🧑‍⚖️ Judge")}
            {renderBotLinks(data.winner, "👑 Winner")}
            {renderBotLinks(data.A, "A Rank")}
            {renderBotLinks(data.B, "B Rank")}
            {renderBotLinks(data.C, "C Rank")}
        </div>
    );
};

export default RaceResults;
