import {getTagsFromIds, Tag} from "../tag/tag";
import {optionService} from "../options/options.service";
import {tagService} from "../tag/tag.service";
import {userService} from "./user.service";

export type UserStorageType = [number, number, [number, string][]];

export class User {
    username: string;
    tags: { tag: Tag, gameID: string }[];
    lastSeen: Date;
    encounters: number;

    constructor(username: string, tags?: Tag[] | {tag: Tag, gameID: string}[], lastSeen?: number, encounters?: number) {
        this.username = username;
        this.tags = [];

        if(tags !== undefined) {
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
        const options = await optionService.get();
        if (this.tags.length < options.maxTags) {
            const match = document.URL.match(/lichess\.org\/(\w{8})/);
            const gameID: string = match ? match[1] : "";
            this.tags.push({tag, gameID});
            tagService.updateFrequentlyUsed(tag).then(() => userService.set(this));
        }
    }

    removeTag(tag: Tag | number) {
        this.updateLastSeen();
        const id = (typeof tag === "number") ? tag : tag.id;
        this.tags = this.tags.filter(t => t.tag.id !== id);
        userService.set(this);
    }

    reArrange(newOrder: number[]) {
        this.updateLastSeen();

        this.tags.sort((a, b) => {
            return (newOrder.indexOf(a.tag.id) > newOrder.indexOf(b.tag.id)) ? 1 : -1;
        });

        userService.set(this);
    }

    private updateLastSeen() {
        this.lastSeen = new Date();
    }

    getTags(): Tag[] {
        return this.tags.map((obj) => obj.tag);
    }

    toStorage(): UserStorageType {
        const tags: [number, string][] = this.tags.map(t => [t.tag.id, t.gameID]);
        return [this.lastSeen.getTime(), this.encounters, tags];
    }

    static async fromStorage(key: string, entry: UserStorageType): Promise<User> {
        const [lastSeen, encounters, encodedTags] = entry;
        const tags = await getTagsFromIds(encodedTags.map(encTag => encTag[0]));
        const tagsWithGameId = [];
        for(let i = 0; i < tags.length; i++) {
            tagsWithGameId.push({tag: tags[i], gameID: encodedTags[i][1]})
        }
        return new User(key, tagsWithGameId, lastSeen, encounters);
    }

    debugPrint() {
        console.log(`User: ${this.username}`);
        console.log(`Tags:${this.tags.map(obj => { 
                let str = ` ID: ${obj.tag.id}`;
                if(obj.gameID.length > 0)
                    str += ` gameID: ${obj.gameID}`;
                return str; })}`);
        console.log(`Encounters: ${this.encounters}`);
        console.log(`Last Seen: ${this.lastSeen.toISOString()}\n`);
    }
}

export function isTagAndGameIDArray(tags: Tag[] | {tag: Tag, gameID: string}[]): tags is {tag: Tag, gameID: string}[] {
    return (tags !== undefined && tags.length > 0) ?
        (tags as {tag: Tag, gameID: string}[])[0].gameID !== undefined : false;
}
