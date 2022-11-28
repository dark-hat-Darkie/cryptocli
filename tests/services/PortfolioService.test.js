"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PortfolioService_1 = require("../../src/services/PortfolioService");
const utils_1 = require("../../src/utils");
describe("Portfolio Service", () => {
    it("should get portfolio of all token given no args", () => __awaiter(void 0, void 0, void 0, function* () {
        const portfolioService = new PortfolioService_1.PortfolioService();
        jest.spyOn(portfolioService, "calculateResult");
        jest.spyOn(portfolioService, "getPortfolio");
        portfolioService.getPortfolio("tests/data/test1.csv");
        yield (0, utils_1.sleep)(500);
        expect(portfolioService.calculateResult).toBeCalledTimes(1);
        expect(portfolioService.portfolioValues).toHaveProperty("BTC");
        expect(portfolioService.portfolioValues).toHaveProperty("XRP");
        expect(portfolioService.portfolioValues).toHaveProperty("ETH");
    }));
    it("should get portfolio of a specified given token", () => __awaiter(void 0, void 0, void 0, function* () {
        const portfolioService = new PortfolioService_1.PortfolioService();
        jest.spyOn(portfolioService, "calculateResult");
        jest.spyOn(portfolioService, "getPortfolio");
        portfolioService.getPortfolio("tests/data/test1.csv", "BTC");
        yield (0, utils_1.sleep)(1500);
        expect(Object.keys(portfolioService.portfolioValues).length).toBe(1);
        expect(portfolioService.portfolioValues).toHaveProperty("BTC");
    }));
});
