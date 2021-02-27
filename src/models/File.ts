import {Strategy} from "../strategies/Strategies";

export interface File {
    fileName: string;
    strategy: Strategy;
}