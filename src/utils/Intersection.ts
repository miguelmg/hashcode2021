import {Intersection} from "../models/Intersection";
import {Street} from "../models/Street";

const streetParse = {
    outgoingIntersection: 0,
    incommingIntersection: 1,
    streetName: 2,
    streetTime: 3,
}

export const getIntersections = (fileData: string[], streetsNumber: number): Intersection[] => {
    let intersections: Intersection[] = [];
    let streets: Street[] = [];

    const startLine = 1;
    const endLine = startLine + streetsNumber;

    const streetList = fileData.slice(startLine, endLine);
    streetList.forEach(streetData => {
        const streetFragments = streetData.split(' ');
        const street: Street = {
            name: streetFragments[streetParse.streetName],
            duration: parseInt(streetFragments[streetParse.streetTime]),
        };

        streets = [
            ...streets,
            street
        ];

        const incomingIntersectionIdx = parseInt(streetFragments[streetParse.incommingIntersection]);

        if (!intersections[incomingIntersectionIdx]) {
            intersections[incomingIntersectionIdx] = {id: incomingIntersectionIdx, incoming: [], outgoing: [], schedule: []};
        }

        intersections[incomingIntersectionIdx].incoming = [
            ...intersections[incomingIntersectionIdx].incoming,
            street,
        ];

        const outgoingIntersectionIdx: number = parseInt(streetFragments[streetParse.outgoingIntersection]);
        if (!intersections[outgoingIntersectionIdx]) {
            intersections[outgoingIntersectionIdx] = {id: outgoingIntersectionIdx, incoming: [], outgoing: [], schedule: []};
        }
        intersections[outgoingIntersectionIdx].outgoing = [
            ...intersections[outgoingIntersectionIdx].outgoing,
            street,
        ];
    });

    return intersections;
};

export const getStreets = (): Street[] => {
  return [];
};
