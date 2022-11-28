import * as dotenv from "dotenv";
dotenv.config();
import prompts from "prompts";
import { PortfolioService } from "./services/PortfolioService";

const portfolioService = new PortfolioService();

/**
 * Takes prompts inputs and calls portfolioService to handle the rest
 */
(async () => {
    const response = await prompts([
        {
            type: "text",
            name: "token",
            message: "Enter Token [Optional]",
        },
        {
            type: "text",
            name: "date",
            message: "Enter Date (YYYY-MM-DD) [Optional]",
        },
    ]);

    console.log("Computing...\n");

    portfolioService.getPortfolio(
        "src/data/transactions.csv",
        response.token?.toUpperCase(),
        response.date
    );
})();
