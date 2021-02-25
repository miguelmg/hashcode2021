import { FileService } from "./services/file.service";
import {Street} from "./models/Street";
import {getIntersections} from "./utils/Intersection";
import {getCars} from "./utils/car";
import {Car} from "./models/Car";

const filesService = new FileService();

const filename1 = 'e.txt';
const fileByLines = filesService.getFileContentLinesByFileName(filename1);
const [simulationSeconds, numberOfIntersections, numberOfStreets, numberOfCars, scoreForReaching] = fileByLines[0].split(' ');

const intersections = getIntersections(fileByLines, parseInt(numberOfStreets));
const cars = getCars(fileByLines, parseInt(numberOfStreets), parseInt(numberOfCars));
const streetsWhereCarsGo: any = {};

cars.forEach((car: Car) => car.path.forEach(pathName => streetsWhereCarsGo[pathName] = streetsWhereCarsGo[pathName] ? streetsWhereCarsGo[pathName] + 1 : 0));

const writeToFile: any = [numberOfIntersections];
intersections.forEach(intersection => {
   writeToFile.push(intersection.id);
   writeToFile.push(intersection.incoming.length);
   intersection.incoming.forEach((street: Street) => writeToFile.push(`${street.name} ${streetsWhereCarsGo[street.name] ? streetsWhereCarsGo[street.name] : 1}`)); //1 second
});

filesService.writeFileContentLinesByFileName(filename1, writeToFile);
