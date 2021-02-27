import { FileService } from "./services/file.service";
import {getIntersections} from "./utils/Intersection";
import {getCars} from "./utils/car";
import {File} from "./models/File";
import {OneSecondStrategy} from "./strategies/OneSecondStrategy";

const files: File[] = [
   {
      fileName: 'a.txt',
      strategy: new OneSecondStrategy()
   },
   {
      fileName: 'b.txt',
      strategy: new OneSecondStrategy()
   },
   {
      fileName: 'c.txt',
      strategy: new OneSecondStrategy()
   },
   {
      fileName: 'd.txt',
      strategy: new OneSecondStrategy()
   },
   {
      fileName: 'e.txt',
      strategy: new OneSecondStrategy()
   },
   {
      fileName: 'f.txt',
      strategy: new OneSecondStrategy()
   }
];

files.forEach(({ fileName, strategy }) => {
   const timeLabel = `File ${fileName} processed in`;
   console.time(timeLabel);
   const fileByLines = FileService.getFileContentLinesByFileName(fileName);
   const [simulationSeconds, numberOfIntersections, numberOfStreets, numberOfCars, scoreForReaching] = fileByLines[0].split(' ');

   const intersections = getIntersections(fileByLines, parseInt(numberOfStreets));
   const cars = getCars(fileByLines, parseInt(numberOfStreets), parseInt(numberOfCars));

   const writeToFile = strategy.process(intersections, cars);

   FileService.writeFileContentLinesByFileName(fileName, writeToFile);
   console.timeEnd(timeLabel);
});
