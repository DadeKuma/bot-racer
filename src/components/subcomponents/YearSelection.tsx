import React from 'react';
import { getAllYearsUntilNow } from '../../dateUtils';
import styles from '../../style/YearSelection.module.scss';

interface YearSelectionProps {
    onSelectYear: (selectedYear: string) => void;
    selectedYear: string;
}

const YearSelection: React.FC<YearSelectionProps> = ({ onSelectYear, selectedYear }) => {
    const renderYearButtons = () => {
        const buttons = [];
        getAllYearsUntilNow().forEach(year => {
            buttons.push(
                <button
                    key={year}
                    className={selectedYear === year ? styles.selected : ''}
                    onClick={() => onSelectYear(year)}
                >
                    {year}
                </button>
            );
        });
        buttons.push(
            <button
                key="all"
                className={selectedYear === 'all' ? styles.selected : ''}
                onClick={() => onSelectYear('all')}
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
