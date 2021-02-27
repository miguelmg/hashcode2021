import {readFileSync, writeFileSync} from "fs";

export class FileService {

    static getFileContentLinesByFileName(fileName: string): string[] {
        const file = readFileSync(`src/input-files/${fileName}`, "utf-8");

        return file
            .split('\n')
            .filter(line => line !== '')
            .map(line => line.replace(/[\r]+/g, ''));
    };

    static writeFileContentLinesByFileName(fileName: string, data: string[]) {
        const dataToString = data.toString().replace(/,/g, '\n');
        writeFileSync(`src/output-files/${fileName}`, dataToString, "utf-8");
    };
}
