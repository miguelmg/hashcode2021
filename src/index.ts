import { FileService } from "./services/file.service";
import {Intersection} from "./models/Intersection";
import {Street} from "./models/Street";
import {getIntersections} from "./utils/Intersection";

const filesService = new FileService();

const filename1 = 'e.txt';
const fileByLines = filesService.getFileContentLinesByFileName(filename1);
const [simulationSeconds, numberOfIntersections, numberOfStreets, numberOfCars, scoreForReaching] = fileByLines[0].split(' ');

const intersections = getIntersections(fileByLines, parseInt(numberOfStreets));

const writeToFile: any = [numberOfIntersections];
intersections.forEach(intersection => {
   writeToFile.push(intersection.id);
   writeToFile.push(intersection.incoming.length);
   intersection.incoming.forEach((street: Street) => writeToFile.push(`${street.name} 1`)); //1 second
});

filesService.writeFileContentLinesByFileName(filename1, writeToFile);
