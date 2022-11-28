import { readCSV } from "../loader";
import { Transaction } from "../interfaces/Transaction";
import { isAfter } from "../utils";

import { ExchangeRateService } from "./ExchangeRateService";
import { PortfolioValues } from "../interfaces/PortfolioValues";

const exchangeService = new ExchangeRateService();

export class PortfolioService {
    portfolioValues: PortfolioValues = {} as PortfolioValues;
    constructor() {}

    /**
     * Driver function to get porfolio values
     *
     * @param filepath (required) -> CSV filename
     * @param token (Optional) -> for which token to filter
     * @param date (Optional) -> for which date to filter
     */
    public getPortfolio(filepath: string, token?: string, date?: string): void {
        readCSV(
            filepath,

            (transaction: Transaction) => {
                this.updatePortfolioBy(transaction, token, date);
            },

            async () => {
                await this.calculateResult();
            }
        );
    }

    /**
     * Gets called everytime with a new row
     *
     * @param transaction -> the single row transaction data
     * @param token (Optional) -> for which token to filter
     * @param date (Optional) -> for which date to filter
     */
    private updatePortfolioBy(
        transaction: Transaction,
        token?: string,
        date?: string
    ): void {
        if (token && date) {
            if (
                transaction.token !== "token" &&
                !isAfter(date, transaction.timestamp)
            ) {
                if (!this.portfolioValues.temp) {
                    this.portfolioValues.temp = { ...this.portfolioValues };
                }
            }

            if (token === transaction.token) {
                this.calculateEachTransaction(transaction);
            }
        } else if (token) {
            if (token === transaction.token) {
                this.calculateEachTransaction(transaction);
            }
        } else if (date) {
            if (
                transaction.token !== "token" &&
                !isAfter(date, transaction.timestamp)
            ) {
                if (!this.portfolioValues.temp) {
                    this.portfolioValues.temp = { ...this.portfolioValues };
                }
            }
            this.calculateEachTransaction(transaction);
        } else {
            this.calculateEachTransaction(transaction);
        }
    }

    /**
     * Calculates total by processing each transaction
     *
     * @param transaction
     */
    private calculateEachTransaction(transaction: Transaction): void {
        const key = transaction.token as keyof PortfolioValues;

        if (transaction.transaction_type === "DEPOSIT") {
            this.portfolioValues[key] =
                this.portfolioValues[key] === undefined
                    ? 0 + transaction.amount
                    : this.portfolioValues[key] + transaction.amount;
        } else if (transaction.transaction_type === "WITHDRAWAL") {
            this.portfolioValues[key] =
                this.portfolioValues[key] === undefined
                    ? 0 - transaction.amount
                    : this.portfolioValues[key] - transaction.amount;
        }
    }

    /**
     * Calculates final result
     */
    public async calculateResult(): Promise<void> {
        const exchangeRates = await exchangeService.getExchangeRate();
        const tempValues = this.portfolioValues.temp;
        if (this.portfolioValues.temp) {
            delete this.portfolioValues.temp;
        }

        for (let key in this.portfolioValues) {
            if (tempValues) {
                this.portfolioValues[key as keyof PortfolioValues] -=
                    tempValues[key];
            }

            this.portfolioValues[key as keyof PortfolioValues] *=
                exchangeRates[key]["USD"];
        }
        this.printResult();
    }

    /**
     * Prints final result in the command line
     */
    private printResult(): void {
        console.log(`Token \tPrice`);
        for (let key in this.portfolioValues) {
            console.log(
                `${key}\t${this.portfolioValues[
                    key as keyof PortfolioValues
                ].toFixed(3)} USD`
            );
        }
    }
}
