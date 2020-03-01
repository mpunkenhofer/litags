import lichessSetData from "./lichess-set";
import frankerfacezSetData from "./frankerfacez-set";
import twitchSetData from "./twitch-set";

export interface SetData {
    name: string;
    iconUrl: string;
    fontUrl: string;
    tags:  {[_: string]: [string[], string, string?]};
}

const defaultSets: SetData[] = [lichessSetData, twitchSetData, frankerfacezSetData];

export default defaultSets;
