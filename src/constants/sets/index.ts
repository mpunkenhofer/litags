import lichessSetData from "./lichess-set";
import frankerfacezSetData from "./frankerfacez-set";
import twitchSetData from "./twitch-set";
import { Font } from "../../common/types";

export interface SetData {
    name: string;
    iconUrl: string;
    font?: Font;
    tags:  {[_: string]: [string, string[]?, string?]};
}

const defaultSets: SetData[] = [lichessSetData, twitchSetData, frankerfacezSetData];

export default defaultSets;
