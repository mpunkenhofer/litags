import {Tag} from "./tag";
import {storageService} from "./storage";

export class User {
    username: string;
    tags: Tag[];

    constructor(username: string, tags: Tag[] = []) {
        this.username = username;
        this.tags = tags;
    }

    public async addTag(tag: Tag) {
        const options = await storageService.getOptions();
        if (this.tags.length < options.maxTags) {
            this.tags.push(tag);
            Tag.increaseFrequentlyUsed(tag.id).then(() => storageService.setUser(this)).catch(e => console.error(e));
        }
    }

    public removeTag(tag: Tag | number) {
        const id = (typeof tag === "number") ? tag : tag.id;
        this.tags = this.tags.filter(t => t.id !== id);
        storageService.setUser(this);
    }

    public reArrange(newOrder: number[]) {
        Tag.getTagsFromIds(newOrder).then(tags => {
            this.tags = tags;
            storageService.setUser(this);
        });
    }
}

