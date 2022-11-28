var needle = require("needle");
export class ExchangeRateService {
    constructor() {}

    /**
     * Get exchange rate from API
     *
     * @returns Object with USD values
     */
    async getExchangeRate(): Promise<any> {
        const response = await needle(
            "get",
            `${process.env.API_BASE_URL}/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD&api_key=${process.env.API_KEY}`
        );

        return response.statusCode === 200 ? response.body : {};
    }
}
