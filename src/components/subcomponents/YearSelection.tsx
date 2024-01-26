import React, { useEffect, useState } from 'react';
import styles from '../../style/YearSelection.module.scss';

interface YearSelectionProps {
    onSelectYear: (selectedYear: string) => void;
}

const YearSelection: React.FC<YearSelectionProps> = ({ onSelectYear }) => {
    const currentYear = new Date().getFullYear();
    const startYear = 2023;
    const [selectedYear, setSelectedYear] = useState<string | null>(null);

    const handleSelection = (year: string) => {
        setSelectedYear(year);
        onSelectYear(year);
    };

    useEffect(() => {
        const year = String(currentYear);
        setSelectedYear(year);
        onSelectYear(year);
    }, [setSelectedYear, onSelectYear, currentYear]);

    const renderYearButtons = () => {
        const buttons = [];
        for (let year = startYear; year <= currentYear; year++) {
            buttons.push(
                <button
                    key={year}
                    className={selectedYear === String(year) ? styles.selected : ''}
                    onClick={() => handleSelection(String(year))}
                >
                    {year}
                </button>
            );
        }
        buttons.push(
            <button
                key="all"
                className={selectedYear === 'all' ? styles.selected : ''}
                onClick={() => handleSelection('all')}
            >
                All
            </button>
        );
        return buttons;
    };

    return (
        <div className={styles.yearSelection}>
            <div>{renderYearButtons()}</div>
        </div>
    );
};

export default YearSelection;
