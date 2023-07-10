import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../style/LeaderboardTab.module.scss";
import { Contestant, RaceData } from "../types";

const LeaderboardTab: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState<Contestant[]>([]);

    const formatUSD = (amount: number): string => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        });

        return formatter.format(amount);
    };

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/data/races.json");
                const data: RaceData[] = await response.json();

                const contestantsMap = new Map<string, Contestant>();

                data.forEach((race) => {
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
                        addToContestant(contestantsMap, name, 0, 1 + winner.length + A.length + B.length + idx));
                });

                const contestants: Contestant[] = Array.from(contestantsMap.values());

                contestants.sort((a, b) => b.earnings - a.earnings);
                setLeaderboard(contestants);
            } catch (error) {
                console.error("Error fetching race data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.leaderboardTab}>
            <table className={styles.leaderboardTable}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Bot</th>
                        <th>USD</th>
                        <th>Races</th>
                        <th>Avg Position</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((contestant, index) => {
                        const avgPosition =
                            contestant.positions.reduce((sum, position) => sum + position, 0) /
                            contestant.positions.length;
                        return (
                            <tr key={contestant.name}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={`/bots/${contestant.name}`} className={styles.botLink}>
                                        {contestant.name}
                                    </Link>
                                </td>
                                <td>{formatUSD(contestant.earnings)}</td>
                                <td>{contestant.races}</td>
                                <td>{avgPosition.toFixed(1)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardTab;
