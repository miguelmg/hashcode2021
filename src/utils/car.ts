import {Car} from "../models/Car";

const carParse = {
    numberOfStreets: 0,
    streets: 1,
}

export const getCars = (fileData: string[], streetsNumber: number, carsNumber: number): Car[] => {
    const initLine = 1 + streetsNumber;
    const endLine = initLine + carsNumber;

    const carsDataParse = fileData.slice(initLine, endLine);

    return carsDataParse.map(carParse => {
        const [carsLine, ...streets] = carParse.split(' ');

        return {
            numberOfStreets: parseInt(carsLine),
            path: streets,
        };
    });
}