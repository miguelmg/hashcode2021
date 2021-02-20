import {readFileSync, writeFileSync} from "fs";

export class FileService {
    constructor() { }

    getFileContentLinesByFileName = (fileName: string): string[] => {
        const file = readFileSync(`src/input-files/${fileName}`, "utf-8");

        return file.split('\n').filter(line => line !== '');
    };

    writeFileContentLinesByFileName = (fileName: string, data: string[]) => {
        const dataToString = data.toString().replace(',', '\n');
        writeFileSync(`src/output-files/${fileName}`, dataToString, "utf-8");
    };
}
