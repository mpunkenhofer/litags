const uuidv4 = require('uuid/v4');

export class ID {
    private readonly id: string;
    constructor(id: string = '') {
        if (id.length === 0) {
            this.id = uuidv4();
        } else {
            this.id = id
        }
    }

    toString(): string {
        return this.id
    }

    equals(id: ID | string): boolean {
        const id_string = (typeof id === "string") ? id : id.toString();
        return id_string === this.id;
    }
}
