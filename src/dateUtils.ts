export const START_YEAR = 2023;

export const getAllYearsUntilNow = (): string[] => {
    let currentYear = START_YEAR;
    const endYear = new Date().getFullYear();
    const years: string[] = [];
    for (var i = currentYear; i <= endYear; i++) {
        years.push(currentYear.toString());
        ++currentYear;
    }
    return years;
};

export const currentYear = (): string => {
    return new Date().getFullYear().toString();
};