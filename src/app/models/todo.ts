export class Todo {
    name: string;
    complete = false;

    constructor(name?: string, complete?: boolean) {
        if(typeof(name) !== undefined){
            this.name = name;
        }
        if(typeof(complete) !== undefined){
            this.complete = complete;
        }
    }
}