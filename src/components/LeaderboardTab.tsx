import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllYearsUntilNow } from "../dateUtils";
import styles from "../style/LeaderboardTab.module.scss";
import { Contestant, RaceData, TabProps } from "../types";
import YearSelection from "./subcomponents/YearSelection";

const LeaderboardTab: React.FC<TabProps> = ({ handleTabChange, handleYearChange, currentYear }) => {
    const [leaderboard, setLeaderboard] = useState<Map<string, Contestant[]>>(new Map<string, Contestant[]>());
    const [sortedColumn, setSortedColumn] = useState<string>("USD");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const columnHeadings = ["Bot", "USD", "Races", "Avg Position"];

    const formatUSD = (amount: number): string => {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        });
        return formatter.format(amount);
    };

    useEffect(() => {
        const addToContestant = (
            contestantsMap: Map<string, Contestant>,
            name: string,
            earnings: number,
            position: number
        ) => {
            const contestant = contestantsMap.get(name);
            if (contestant) {
                contestant.earnings += earnings;
                contestant.races++;
                contestant.positions.push(position);
            } else {
                contestantsMap.set(name, {
                    name,
                    earnings,
                    races: 1,
                    positions: [position],
                });
            }
        };

        const leaderboardMap = new Map<string, Contestant[]>();
        const contestantsGlobalMap = new Map<string, Contestant>();
        Promise.all(getAllYearsUntilNow().map(async year => {
            const contestantsMap = new Map<string, Contestant>();
            let raceData: RaceData[];
            try {
                const response = await fetch(`/data/races/${year}.json`);
                raceData = await response.json();
            } catch (error) {
                return console.error(`Error fetching race data for year ${year}: ${error}`);
            }
            raceData.forEach((race) => {
                const { winner, A, B, C, prize } = race.data;
                winner.forEach((name) =>
                    addToContestant(contestantsMap, name, prize.winner, 1)
                );
                A.forEach((name, idx) =>
                    addToContestant(contestantsMap, name, prize.A, 1 + winner.length + idx)
                );
                B.forEach((name, idx) =>
                    addToContestant(contestantsMap, name, prize.B, 1 + winner.length + A.length + idx)
                );
                C.forEach((name, idx) =>
                    addToContestant(contestantsMap, name, 0, 1 + winner.length + A.length + B.length + idx)
                );
            });
            contestantsMap.forEach((c, name) => {
                const prevData = contestantsGlobalMap.get(name);
                const data = prevData ? {
                    name: c.name,
                    earnings: c.earnings + prevData.earnings,
                    races: c.races + prevData.races,
                    positions: [...c.positions, ...prevData.positions]
                } : c;
                contestantsGlobalMap.set(name, data);
            });
            leaderboardMap.set(year, Array.from(contestantsMap.values()));
        })).then(() => {
            leaderboardMap.set("all", Array.from(contestantsGlobalMap.values()));
            setLeaderboard(() => leaderboardMap);
        });
    }, []);

    useEffect(() => {
        setLeaderboard(prevLeaderboard => {
            const data = prevLeaderboard.get(currentYear);
            if (!data)
                return prevLeaderboard;
            const result = [...data].sort((a, b) => {
                if (sortedColumn === "Bot") {
                    return sortOrder === "asc"
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name);
                } else if (sortedColumn === "USD") {
                    return sortOrder === "asc"
                        ? a.earnings - b.earnings
                        : b.earnings - a.earnings;
                } else if (sortedColumn === "Races") {
                    return sortOrder === "asc" ? a.races - b.races : b.races - a.races;
                } else if (sortedColumn === "Avg Position") {
                    const avgPositionA = a.positions.reduce((sum, position) => sum + position, 0) /
                        a.positions.length;
                    const avgPositionB = b.positions.reduce((sum, position) => sum + position, 0) /
                        b.positions.length;
                    return sortOrder === "asc"
                        ? avgPositionA - avgPositionB
                        : avgPositionB - avgPositionA;
                }
                return 0;
            });
            const newLeaderboard = new Map(prevLeaderboard);
            newLeaderboard.set(currentYear, result);
            return newLeaderboard;
        });
    }, [sortOrder, sortedColumn, currentYear]);

    const sortColumn = (column: string) => {
        if (sortedColumn === column) {
            setSortOrder(o => o === "asc" ? "desc" : "asc");
        } else {
            setSortOrder(() => "asc");
            setSortedColumn(() => column);
        }
    };

    const leaderboardBody = () => {
        const result = leaderboard.get(currentYear);
        if (!result) {
            console.error(`Couldn't find year ${currentYear}`);
            return <></>;
        }
        return result.map((contestant, index) => {
            const avgPosition =
                contestant.positions.reduce((sum, position) => sum + position, 0) /
                contestant.positions.length;
            return (
                <tr key={contestant.name}>
                    <td>{index + 1}</td>
                    <td>
                        <Link
                            to={`/bots/?search=${contestant.name}`}
                            className={styles.botLink}
                            onClick={() => handleTabChange("/bots")}
                        >
                            {contestant.name}
                        </Link>
                    </td>
                    <td>{formatUSD(contestant.earnings)}</td>
                    <td>{contestant.races}</td>
                    <td>{avgPosition.toFixed(1)}</td>
                </tr>
            );
        });
    };

    return (
        <div className={styles.leaderboardTab}>
            <YearSelection onSelectYear={handleYearChange} selectedYear={currentYear} />
            <table className={styles.leaderboardTable}>
                <thead>
                    <tr>
                        <th>#</th>
                        {columnHeadings.map((column) => (
                            <th
                                key={column}
                                onClick={() => sortColumn(column)}
                                className={sortedColumn === column ? sortOrder : ""}
                            >
                                {column}
                                {sortedColumn === column && (
                                    <span className={`arrow ${sortOrder === "asc" ? "asc" : "desc"}`}>
                                        {sortOrder === "asc" ? "▲" : "▼"}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {leaderboardBody()}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardTab;
