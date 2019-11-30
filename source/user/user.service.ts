import {User} from "./user";
import {getTagsFromIds} from "../tag/tag";
import {keys} from "../constants/keys";
import {cache} from "../util/cache";

const browser = require("webextension-polyfill");

class UserService {
    public async get(username: string): Promise<User> {
        const userData = await browser.storage.local.get(username);

        if (Object.keys(userData).length !== 0) {
            const tags = await getTagsFromIds(userData[username]);
            return new User(username, tags);
        } else {
            return new User(username);
        }
    }

    public async set(user: User) {
        cache.del(keys.cache.users);

        return browser.storage.local.set({[user.username]: user.tags.map(t => t.id)});
    }

    public remove(user: User) {
        cache.del(keys.cache.users);

        browser.storage.local.remove(user.username);
    }

    public async getAll(): Promise<User[]> {
        let users = cache.get(keys.cache.users);

        if(users != undefined)
            return users;

        // get all
        const data = await browser.storage.local.get(null);
        users = [];

        for(const key in data) {
            if (data.hasOwnProperty(key)) {
                if (!key.startsWith(keys.prefix)) {
                    const tags = await getTagsFromIds(data[key]);
                    users.push(new User(key, tags))
                }
            }
        }

        cache.set(keys.cache.users, users);

        return users;
    }
}

export const userService = new UserService();
