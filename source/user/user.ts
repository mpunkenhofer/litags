import {getTagsFromIds, Tag} from "../tag/tag";
import {optionService} from "../options/options.service";
import {tagService} from "../tag/tag.service";
import {userService} from "./user.service";

export class User {
    username: string;
    tags: Tag[];

    constructor(username: string, tags: Tag[] = []) {
        this.username = username;
        this.tags = tags;
    }

    public async addTag(tag: Tag) {
        const options = await optionService.get();
        if (this.tags.length < options.maxTags) {
            this.tags.push(tag);
            tagService.updateFrequentlyUsed(tag).then(() => userService.set(this));
        }
    }

    public removeTag(tag: Tag | number) {
        const id = (typeof tag === "number") ? tag : tag.id;
        this.tags = this.tags.filter(t => t.id !== id);
        userService.set(this);
    }

    public reArrange(newOrder: number[]) {
        getTagsFromIds(newOrder).then(tags => {
            this.tags = tags;
            userService.set(this);
        });
    }
}

