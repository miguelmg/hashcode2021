import { FileService } from "./services/file.service";
import {getIntersections} from "./utils/Intersection";

const filesService = new FileService();

const filename = 'a.txt';
const fileData = filesService.getFileContentLinesByFileName(filename);
console.log(fileData);

const streetsNumber = 5;

const intersections = getIntersections(fileData, streetsNumber);

console.log(intersections);

// const data1 = ["asdadbashfbajhsfba","asd adadsadsasd"];
// filesService.writeFileContentLinesByFileName(filename, data1);
