import * as fs from "fs";
import * as path from "path";
import * as papa from "papaparse";
import { Transaction } from "./interfaces/Transaction";

/**
 * Reads CSV file in readablestream manner, with chunk by chunk and process data.
 *
 * @param filename
 * @param getRow
 * @param onFinish
 */
export const readCSV = async (
    filepath: string,
    getRow: (transaction: Transaction) => void,
    onFinish: () => void
) => {
    fs.createReadStream(path.resolve(filepath))
        .pipe(papa.parse(papa.NODE_STREAM_INPUT, { fastMode: true }))

        .on("error", (error) => console.error(error))
        .on("data", (row) => {
            getRow({
                amount: parseFloat(row[3]),
                transaction_type: row[1],
                timestamp: row[0],
                token: row[2],
            } as Transaction);
        })
        .on("end", () => {
            onFinish();
        });
};
