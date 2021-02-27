import {Intersection} from "../models/Intersection";
import {Car} from "../models/Car";

export interface Strategy {
    process(intersections: Intersection[], cars: Car[]): any[];
}
