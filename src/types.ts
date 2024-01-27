export type IssueData = {
    [submitter: string]: string;
};

export type Option = {
    value: string;
    label: string;
};

export type RaceData = {
    name: string;
    data: {
        judge: string;
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

export type Contestant = {
    name: string;
    earnings: number;
    races: number;
    positions: number[];
};

export type BotStats = {
    bot: string;
    winner: number;
    A: number;
    B: number;
    C: number;
};

export interface TabProps {
    handleTabChange: (tabName: string) => void;
    handleYearChange: (year: string) => void;
    currentYear: string;
}
