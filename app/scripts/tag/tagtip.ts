import tags from "../configs/tags.config";

export function printJson() {
    console.log(Object.keys(tags).length);
    console.log(JSON.stringify(tags.unamed1));
    console.log('hello1');
}

