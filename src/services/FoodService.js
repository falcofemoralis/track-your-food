import { BarcodeStatus } from '../constants/BarcodeStatus';

const HTMLParser = require('fast-html-parser');

export const FindFoodById = async (id) => {
    try {
        const res = await fetch(`https://barcode-list.ru/barcode/RU/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA.htm?barcode=${id}`)
        const html = await res.text()
        const root = HTMLParser.parse(html);

        if (root) {
            const nameEl = root.querySelector("table.randomBarcodes tr.even")

            if (nameEl) {
                const row = nameEl.querySelectorAll("td")

                if (row.length > 0) {
                    return { type: BarcodeStatus.Exist, name: row[2].rawText }
                }
            }
        }

        return { type: BarcodeStatus.NotFound }
    } catch (error) {
        console.error(error)
    }
}