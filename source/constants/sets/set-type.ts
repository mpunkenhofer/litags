//export default type setType = {name: string, enabled: boolean, tags: { [_: string]: [string[], string, string?] }};

export default interface SetType {
    name: string,
    enabled: boolean,
    fontSet: boolean,
    tags: { [_: string]: [string[], string, string?] }
};