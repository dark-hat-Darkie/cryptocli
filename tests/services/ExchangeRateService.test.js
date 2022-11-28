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
const ExchangeRateService_1 = require("../../src/services/ExchangeRateService");
const utils_1 = require("../../src/utils");
describe("Exchange Rate Service", () => {
    it("should get USD values of BTC, XRP and ETH", () => __awaiter(void 0, void 0, void 0, function* () {
        const exchangeRateService = new ExchangeRateService_1.ExchangeRateService();
        const res = yield exchangeRateService.getExchangeRate();
        yield (0, utils_1.sleep)(2500);
        expect(res).not.toBe(null);
        expect(res).toHaveProperty("BTC");
        expect(res).toHaveProperty("XRP");
        expect(res).toHaveProperty("ETH");
    }));
});
