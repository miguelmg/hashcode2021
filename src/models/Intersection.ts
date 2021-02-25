import {Schedule} from "./Schedule";
import {Street} from "./Street";

export interface Intersection {
    id: number;
    incoming: Street[];
    outgoing: Street[];
    schedule: Schedule[];
}
