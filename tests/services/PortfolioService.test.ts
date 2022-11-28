import { PortfolioService } from "../../src/services/PortfolioService";
import { sleep } from "../../src/utils";

describe("Portfolio Service", () => {
    it("should get portfolio of all token given no args", async () => {
        const portfolioService = new PortfolioService();
        jest.spyOn(portfolioService, "calculateResult");
        jest.spyOn(portfolioService, "getPortfolio");
        portfolioService.getPortfolio("tests/data/test1.csv");
        await sleep(500);
        expect(portfolioService.calculateResult).toBeCalledTimes(1);
        expect(portfolioService.portfolioValues).toHaveProperty("BTC");
        expect(portfolioService.portfolioValues).toHaveProperty("XRP");
        expect(portfolioService.portfolioValues).toHaveProperty("ETH");
    });

    it("should get portfolio of a specified given token", async () => {
        const portfolioService = new PortfolioService();
        jest.spyOn(portfolioService, "calculateResult");
        jest.spyOn(portfolioService, "getPortfolio");
        portfolioService.getPortfolio("tests/data/test1.csv", "BTC");
        await sleep(1500);
        expect(Object.keys(portfolioService.portfolioValues).length).toBe(1);
        expect(portfolioService.portfolioValues).toHaveProperty("BTC");
    });
});
