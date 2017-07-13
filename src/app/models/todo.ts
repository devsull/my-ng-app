import * as _ from "lodash";

export class Todo {
    name: string;
    complete = false;
    readonly id: number;

    constructor(name?: string, complete?: boolean) {
        this.id = parseInt(_.uniqueId(), 10);
        if (typeof(name) !== "undefined") {
            this.name = name;
        }
        if (typeof(complete) !== "undefined") {
            this.complete = complete;
        }
    }
}