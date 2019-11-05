import {Tag} from "./tag";

const browser = require("webextension-polyfill/dist/browser-polyfill.min");


export class User {
    username: string;
    tags: Tag[];

    constructor(username: string, tags: Tag[] = []) {
        this.username = username;
        this.tags = tags;
    }
}

