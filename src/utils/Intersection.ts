import {Intersection} from "../models/Intersection";
import {Street} from "../models/Street";

const streetParse = {
    incommingIntersection: 0,
    outgoingIntersection: 1,
    streetName: 2,
    streetTime: 3,
}

export const getIntersections = (fileData: string[], streetsNumber: number): Intersection[] => {
    let interserctions: Intersection[] = [];
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
        interserctions[incomingIntersectionIdx].incoming = [
            ...interserctions[incomingIntersectionIdx].incoming,
            street,
        ];

        const outgoingIntersectionIdx: number = parseInt(streetFragments[streetParse.outgoingIntersection]);
        interserctions[outgoingIntersectionIdx].outgoing = [
            ...interserctions[outgoingIntersectionIdx].outgoing,
            street,
        ];
    });

    return interserctions;
};

export const getStreets = (): Street[] => {
  return [];
};
