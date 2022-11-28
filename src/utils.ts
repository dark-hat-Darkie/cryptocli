/**
 * Checks whether the current row date (2nd parameter) is after chosen date (1st parameter)
 * @param date
 * @param timestamp
 * @returns boolean
 */

export const isAfter = (date: string, timestamp: string): boolean => {
    const chosenDate = new Date(date);
    const currentRowDate = new Date(parseInt(timestamp) * 1000);

    return currentRowDate >= chosenDate ? true : false;
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
