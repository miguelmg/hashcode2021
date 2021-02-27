import {Strategy} from "./Strategies";
import {Intersection} from "../models/Intersection";
import {Car} from "../models/Car";
import {Street} from "../models/Street";

export class SecondsPerCarsOnStreetStrategy implements Strategy {

    /**
     * Each incoming intersection gets as many seconds of green light as cars pass on it.
     * We filter out non-trafficked streets
     * @param intersections
     * @param cars
     */
    process(intersections: Intersection[], cars: Car[]): any[] {
        const traffickedStreets: any = {};
        cars.forEach((car: Car) => car.path.forEach(pathName => traffickedStreets[pathName] = traffickedStreets[pathName] ? traffickedStreets[pathName] + 1 : 1));

        const writeToFile: any = [intersections.length];
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

        return writeToFile;
    }
}
