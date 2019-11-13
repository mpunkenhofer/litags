import {getTagsFromIds, Tag} from "./tag";
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
            storageService.updateFrequentlyUsedTags(tag).then(() => storageService.setUser(this));
        }
    }

    public removeTag(tag: Tag | number) {
        const id = (typeof tag === "number") ? tag : tag.id;
        this.tags = this.tags.filter(t => t.id !== id);
        storageService.setUser(this);
    }

    public reArrange(newOrder: number[]) {
        getTagsFromIds(newOrder).then(tags => {
            this.tags = tags;
            storageService.setUser(this);
        });
    }
}

