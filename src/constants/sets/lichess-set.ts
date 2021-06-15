import {SetData} from "./index";
import { browser } from "webextension-polyfill-ts";

const lichessSetData: SetData = {
    "name": "Lichess",
    "iconUrl": browser.runtime.getURL('assets/images/lichess_icon512.png'),
    "font": {
        fontFamily: 'lichess-tags',
        src: `url(${browser.runtime.getURL('assets/fonts/lichess-tags.woff2')} format("woff2")`,
    },
    "tags": {
        "exit": ["0"],
        "tv": ["1"],
        // "hand-top": ["2"], // unused after an update
        "wifi": ["3"],
        "delicious": ["4"],
        "shield": ["5"],
        "inkPen": ["6"],
        "target": ["7"],
        "crown": ["8"],
        "chart-line": ["9"],
        "lock": ["a"],
        "white-flag": ["b"],
        "dialog-bubble": ["c"],
        "dialog-bubbles": ["d"],
        "letter": ["e"],
        "crowd": ["f"],
        "goblet": ["g", ["variant"]],
        "thumb-up": ["h"],
        "arrow-loop-left": ["i"],
        "exclamation": ["j"],
        "not-allowed": ["k"],
        "pen": ["m"],
        "tag": ["o"],
        "clock": ["p"],
        "trash-bin": ["q"],
        "human": ["r"],
        "star": ["s"],
        "full-star": ["t"],
        "eye": ["v"],
        "power-button": ["w"],
        "search-find": ["y"],
        "arrow-loop-right": ["z"],
        "microscope": ["A"],
        "loop": ["B"],
        "crown-king": ["C"],
        "check": ["E"],
        "leave": ["F"],
        "circle-full": ["J"],
        "circle": ["K"],
        "cancel": ["L"],
        "arrow-left-down": ["M"],
        "arrow-right-up": ["N"],
        "plus": ["O"],
        "arrow-loop": ["P"],
        "burning-fire": ["Q"],
        "arrow-down": ["R"],
        "arrow-up": ["S"],
        "lightning": ["T"],
        "crossed-swords": ["U"],
        "pause": ["Z"],
        "antichess": ["@", ["variant"]],
        "rabbit": ["#", ["rapid"]],
        "turtle": ["+", ["classic", "slow"]],
        "repo": ["&", ["repository"]],
        "feather": ["*"],
        "flag": ["("],
        "flame": [")", ["blitz"]],
        "book": ["]", ["repo"]],
        "link": ["\"", ["chain"]],
        "die-six": ["'", ["die", "dice", "960", "chess960", "variant"]],
        "nuclear": [","],
        "arrow-streamline-target": ["-"],
        "buffer": [".", ["threecheck", "variant"]],
        "upload-cloud": ["/"],
        "pointer": ["{", ["ultrabullet", "variant"]],
        "hookah": ["~", ["bongcloud"]],
        "berserk": ["`"],
        "graph": ["^"],
        "graduate-cap": [":"],
        "plane": [";"],
        "zoom-in": ["<"],
        "atomic": [">", ["variant"]],
        "screen": ["="]
    }
};

export default lichessSetData;