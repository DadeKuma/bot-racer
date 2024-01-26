import React, { useEffect, useState } from 'react';
import { currentYear, getAllYearsUntilNow } from '../../dateUtils';
import styles from '../../style/YearSelection.module.scss';

interface YearSelectionProps {
    onSelectYear: (selectedYear: string) => void;
}

const YearSelection: React.FC<YearSelectionProps> = ({ onSelectYear }) => {
    const [selectedYear, setSelectedYear] = useState<string>(currentYear);

    const handleSelection = (year: string) => {
        setSelectedYear(year);
        onSelectYear(year);
    };

    useEffect(() => {
        onSelectYear(selectedYear);
    }, [onSelectYear, selectedYear]);

    const renderYearButtons = () => {
        const buttons = [];
        getAllYearsUntilNow().forEach(year => {
            buttons.push(
                <button
                    key={year}
                    className={selectedYear === year ? styles.selected : ''}
                    onClick={() => handleSelection(year)}
                >
                    {year}
                </button>
            );
        });
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
