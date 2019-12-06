import {Tag} from "../tag/tag";
import {keys} from "../constants/keys";
import {storageService} from "../util/storage";

const browser = require("webextension-polyfill");

export class User {
    private readonly username: string;
    private tags: { tag: Tag, gameID: string }[];
    private lastSeen: Date;
    private encounters: number;

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

    getUserName(): string {
        return this.username;
    }

    getLastSeen(): Date {
        return this.lastSeen;
    }

    getEncounters(): number {
        return this.encounters;
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

    static async fromData(username: string, data: [number, number, [string, string][]]): Promise<User> {
        if (data && Object.keys(data).length !== 0) {
            const [lastSeen, encounters, encodedTags] = data;
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

    toData() {
        const tags: [string, string][] = this.tags.map(t => [t.tag.getID(), t.gameID]);
        return [this.lastSeen.getTime(), this.encounters, tags];
    }

    static async load(username: string): Promise<User> {
        const userData = (await browser.storage.local.get(username))[username];
        return User.fromData(username, userData);
    }

    store() {
        if (this.username.startsWith(keys.prefix))
            return Promise.reject(`User names starting with ${keys.prefix} are not allowed.`);

        return browser.storage.local.set({[this.username]: this.toData()});
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

export function sortByName(users: User[], ascending: boolean = false): User[] {
    const sorted = users.sort((a, b) => {
        return a.getUserName().localeCompare(b.getUserName());
    });

    return ascending ? sorted.reverse() : sorted;
}

export function sortByLastSeen(users: User[], ascending: boolean = false): User[] {
    const sorted = users.sort((a, b) => {
        return b.getLastSeen().getTime() - a.getLastSeen().getTime();
    });

    return ascending ? sorted.reverse() : sorted;
}

export function sortByEncounters(users: User[], ascending: boolean = false): User[] {
    const sorted = users.sort((a, b) => {
        return (a.getLastSeen() > b.getLastSeen()) ? 1 : -1;
    });

    return ascending ? sorted.reverse() : sorted;
}

export function searchUsers(term: string, users: User[]): User[] {
    return users.filter(user => user.getUserName().includes(term));
}