import {Tag} from "../tag/tag";
import {keys} from "../constants/keys";
import {storageService} from "../util/storage";

const browser = require("webextension-polyfill");

export class User {
    username: string;
    tags: { tag: Tag, gameID: string }[];
    lastSeen: Date;
    encounters: number;

    constructor(username: string, tags?: Tag[] | { tag: Tag, gameID: string }[], lastSeen?: number, encounters?: number) {
        this.username = username;
        this.tags = [];

        if (tags !== undefined) {
            if (isTagAndGameIDArray(tags))
                this.tags = tags;
            else {
                for (const t of tags)
                    this.tags.push({tag: t, gameID: ""});
            }
        }

        this.lastSeen = (lastSeen !== undefined) ? new Date(lastSeen) : new Date();
        this.encounters = (encounters !== undefined) ? encounters + 1 : 1;
    }

    async addTag(tag: Tag) {
        this.updateLastSeen();
        const options = await storageService.getOptions();
        if (this.tags.length < options.maxTags) {
            const match = document.URL.match(/lichess\.org\/(\w{8})/);
            const gameID: string = match ? match[1] : "";
            this.tags.push({tag, gameID});
            storageService.updateFrequentlyUsed(tag).then(() => this.store());
        }
    }

    removeTag(tag: Tag | string) {
        if (tag) {
            this.updateLastSeen();
            const id = (typeof tag === "string") ? tag : tag.getID();
            this.tags = this.tags.filter(t => t.tag.getID() !== id);
            this.store();
        }
    }

    reArrange(newOrder: string[]) {
        this.updateLastSeen();

        this.tags.sort((a, b) => {
            return (newOrder.indexOf(a.tag.getID()) > newOrder.indexOf(b.tag.getID())) ? 1 : -1;
        });

        this.store();
    }

    private updateLastSeen() {
        this.lastSeen = new Date();
    }

    getTags(): Tag[] {
        return this.tags.map((obj) => obj.tag);
    }

    static async load(username: string): Promise<User> {
        const userData = (await browser.storage.local.get(username))[username];

        if (userData && Object.keys(userData).length !== 0) {
            const [lastSeen, encounters, encodedTags] = userData;
            const tags = await Promise.all(encodedTags.map(encTag => Tag.fromID(encTag[0])));
            const tagsWithGameId = [];
            for (let i = 0; i < tags.length; i++) {
                tagsWithGameId.push({tag: tags[i], gameID: encodedTags[i][1]})
            }
            const loadedUser = new this(username, tagsWithGameId, lastSeen, encounters);

            // if we have already assigned tags to the user store it to save updated last seen / encounters
            if(loadedUser.tags.length > 0)
                await loadedUser.store();

            return loadedUser;
        } else {
            return new User(username);
        }
    }

    store() {
        if (this.username.startsWith(keys.prefix))
            return Promise.reject(`User names starting with ${keys.prefix} are not allowed.`);

        const tags: [string, string][] = this.tags.map(t => [t.tag.getID(), t.gameID]);
        return browser.storage.local.set({[this.username]: [this.lastSeen.getTime(), this.encounters, tags]});
    }

    delete() {
        browser.storage.local.remove(this.username);
    }

    debugPrint() {
        const user = `User: ${this.username}`;
        const tags =
            `${this.tags.map(obj => {
                let str = ` ID: ${obj.tag.getID()}`;
                if (obj.gameID.length > 0)
                    str += ` gameID: ${obj.gameID}`;
                return str;
            })}`.trim();
        const encounters = `Encounters: ${this.encounters}`;
        const lastSeen = `Last Seen: ${this.lastSeen.toISOString()}`;

        if(tags)
            console.log(`${user}\nTags: ${this.tags.length}\n${tags}\n${encounters}\n${lastSeen}\n`);
        else
            console.log(`${user}\n${encounters}\n${lastSeen}\n`);
    }
}

export function isTagAndGameIDArray(tags: Tag[] | { tag: Tag, gameID: string }[]): tags is { tag: Tag, gameID: string }[] {
    return (tags !== undefined && tags.length > 0) ?
        (tags as { tag: Tag, gameID: string }[])[0].gameID !== undefined : false;
}
