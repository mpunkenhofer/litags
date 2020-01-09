import lichessSetData from "./lichess-set";
import frankerfacezSetData from "./frankerfacez-set";

export interface SetType {
    name: string,
    enabled: boolean,
    fontSet: boolean,
    tags: { [_: string]: [string[], string, string?] }
}

const defaultSets = [lichessSetData, frankerfacezSetData];

export default defaultSets;
