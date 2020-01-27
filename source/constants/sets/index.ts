import lichessSetData from "./lichess-set";
import frankerfacezSetData from "./frankerfacez-set";
import twitchSetData from "./twitch-set";

export interface SetType {
    name: string,
    icon: string,
    enabled: boolean,
    fontSet: boolean,
    tags: { [_: string]: [string[], string, string?] }
}

const defaultSets = [lichessSetData, twitchSetData, frankerfacezSetData];

export default defaultSets;
