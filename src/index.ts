import { FileService } from "./services/file.service";
import {Street} from "./models/Street";
import {getIntersections} from "./utils/Intersection";
import {getCars} from "./utils/car";
import {Car} from "./models/Car";

const inputFiles = ['a.txt', 'b.txt', 'c.txt', 'd.txt', 'e.txt', 'f.txt'];
// const inputFiles = ['a.txt'];

inputFiles.forEach(inputFile => {
   const timeLabel = `File ${inputFile} processed in`;
   console.time(timeLabel);
   const fileByLines = FileService.getFileContentLinesByFileName(inputFile);
   const [simulationSeconds, numberOfIntersections, numberOfStreets, numberOfCars, scoreForReaching] = fileByLines[0].split(' ');

   const intersections = getIntersections(fileByLines, parseInt(numberOfStreets));
   const cars = getCars(fileByLines, parseInt(numberOfStreets), parseInt(numberOfCars));

   const traffickedStreets: any = {};
   cars.forEach((car: Car) => car.path.forEach(pathName => traffickedStreets[pathName] = traffickedStreets[pathName] ? traffickedStreets[pathName] + 1 : 1));

   const writeToFile: any = [numberOfIntersections];
   let intersectionsWithTraffic = 0;
   intersections.forEach(intersection => {
      const streetsWithTraffic = intersection.incoming.filter(street => traffickedStreets[street.name]);

      if (streetsWithTraffic.length !== 0) {
         intersectionsWithTraffic++;
         writeToFile.push(intersection.id);
         writeToFile.push(streetsWithTraffic.length);
         streetsWithTraffic.forEach((street: Street) => writeToFile.push(`${street.name} ${traffickedStreets[street.name]}`));
      }
   });

   writeToFile[0] = intersectionsWithTraffic;
   FileService.writeFileContentLinesByFileName(inputFile, writeToFile);
   console.timeEnd(timeLabel);
});
