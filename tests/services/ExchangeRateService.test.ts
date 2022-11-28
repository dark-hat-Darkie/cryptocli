import { ExchangeRateService } from "../../src/services/ExchangeRateService";
import { sleep } from "../../src/utils";

describe("Exchange Rate Service", () => {
    it("should get USD values of BTC, XRP and ETH", async () => {
        const exchangeRateService = new ExchangeRateService();
        const res = await exchangeRateService.getExchangeRate();

        await sleep(2500);

        expect(res).not.toBe(null);
        expect(res).toHaveProperty("BTC");
        expect(res).toHaveProperty("XRP");
        expect(res).toHaveProperty("ETH");
    });
});
