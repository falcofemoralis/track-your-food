import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import Food from '../objects/Food';

const HTMLParser = require('fast-html-parser');
export default class {
    fileName = "foodList.txt";
    foodList;
    setFoodList;

    constructor() {
        [this.foodList, this.setFoodList] = useState()

        this.init()
    }

    init = async () => {
        let list = []
        try {
            list = JSON.parse((await FileSystem.readAsStringAsync(FileSystem.documentDirectory + this.fileName)))
        } catch (e) {
            // ignore
        }
        this.setFoodList(list)
    }

    /**
     * Добавление нового объекта еды
     * @param {Food} food - объект еды для добавления в общий список
     */
    addFood = (food) => {
        this.setFoodList(prev => {
            const list = [
                ...prev,
                food
            ]

            FileSystem.writeAsStringAsync(FileSystem.documentDirectory + this.fileName, JSON.stringify(list), { encoding: FileSystem.EncodingType.UTF8 });

            return list
        })
    }

    /**
     * Поиск объекта еды за его id
     * @param {number} id - id продукта 
     * @returns {Food} - найденный объкт продукта
     */
    findFoodById = async (id) => {
        try {
            const res = await fetch(`https://barcode-list.ru/barcode/RU/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA.htm?barcode=${id}`)
            const html = await res.text()
            const root = HTMLParser.parse(html);

            if (root) {
                const nameEl = root.querySelector("table.randomBarcodes tr.even")

                if (nameEl) {
                    const row = nameEl.querySelectorAll("td")

                    if (row.length > 0) {
                        return new Food(row[2].rawText, null)
                    }
                }
            }

            throw Error("not found")
        } catch (error) {
            console.error(error)
        }
    }

}