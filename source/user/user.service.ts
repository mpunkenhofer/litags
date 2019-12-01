import {User} from "./user";
import {keys} from "../constants/keys";
import {cache} from "../util/cache";

const browser = require("webextension-polyfill");

class UserService {
    async get(username: string): Promise<User> {
        const userData = await browser.storage.local.get(username);

        if (Object.keys(userData).length !== 0) {
            return User.fromStorage(username, userData[username]);
        } else {
            return new User(username);
        }
    }

    async set(user: User) {
        cache.del(keys.cache.users);

        return browser.storage.local.set({[user.username]: user.toStorage()});
    }

    remove(user: User) {
        cache.del(keys.cache.users);

        browser.storage.local.remove(user.username);
    }

    async getAll(): Promise<User[]> {
        let users = cache.get(keys.cache.users);

        if(users != undefined)
            return users;

        // get all
        const data = await browser.storage.local.get(null);
        users = [];

        for(const key in data) {
            if (data.hasOwnProperty(key)) {
                if (!key.startsWith(keys.prefix)) {
                    const user = await User.fromStorage(key, data[key]);
                    users.push(user);
                }
            }
        }

        cache.set(keys.cache.users, users);

        return users;
    }
}

export const userService = new UserService();
