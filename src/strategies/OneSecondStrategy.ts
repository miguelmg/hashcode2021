import {Strategy} from "./Strategies";
import {Car} from "../models/Car";
import {Intersection} from "../models/Intersection";
import {Street} from "../models/Street";

export class OneSecondStrategy implements Strategy {

    /**
     * For every incoming street in every intersection, they get a schedule of 1 second of green light
     * @param intersections
     * @param cars
     */
    process(intersections: Intersection[], cars: Car[]): any[] {
        const writeToFile: any = [intersections.length];
        intersections.forEach(intersection => {
            writeToFile.push(intersection.id);
            writeToFile.push(intersection.incoming.length);
            intersection.incoming.forEach((street: Street) => writeToFile.push(`${street.name} 1`));
        });

        return writeToFile;
    }

}
