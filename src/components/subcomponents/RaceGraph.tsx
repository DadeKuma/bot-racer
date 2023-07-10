import React from "react";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import styles from "../../style/RaceGraph.module.scss";
import { RaceData } from "../../types";

interface RaceGraphProps {
    bot: string;
    raceData: RaceData[];
}

const RaceGraph: React.FC<RaceGraphProps> = ({ bot, raceData }) => {
    const getPositionForBot = (race: RaceData) => {
        const { winner, A, B, C } = race.data;
        if (winner.includes(bot)) {
            return 1;
        }
        const aRank = A.indexOf(bot);
        if (aRank !== -1) {
            return 1 + winner.length + aRank;
        }
        const bRank = B.indexOf(bot);
        if (bRank !== -1) {
            return 1 + winner.length + A.length + bRank;
        }
        const cRank = C.indexOf(bot);
        if (cRank !== -1) {
            return 1 + winner.length + A.length + B.length + cRank;
        }
        return 0;
    };

    const filteredRaceData = raceData.filter((race) => {
        const { winner, A, B, C } = race.data;
        return [winner, A, B, C].some((positions) => positions.includes(bot));
    });

    const CustomTooltip: React.FC<any> = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const raceName = payload[0].payload.name;
            const position = payload[0].value;
            return (
                <div className={styles.tooltip}>
                    <p>Race: {raceName}</p>
                    <p>Position: {position}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={styles.raceGraph}>
            <h3>Race Positions</h3>
            <div className={styles.raceWrapper}>
                <ResponsiveContainer>
                    <LineChart
                        width={800}
                        height={400}
                        data={filteredRaceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    >
                        <YAxis
                            type="number"
                            domain={[1]}
                            allowDecimals={false}
                            stroke="#fff"
                            reversed
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey={(race) => getPositionForBot(race)}
                            name="Position"
                            stroke="#fff"
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RaceGraph;
