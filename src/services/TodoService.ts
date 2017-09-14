import { ITodoEntity } from "./../entities/ITodoEntity";

export class TodoService {
    private collection = [
        {
            name: "Learn Aurelia",
            isCompleted: true
        },
        {
            name: "Learn DIxx",
            isCompleted: true
        }
    ];

    retrieve() {
        return this.collection;
    }

    append(todo) {
        this.collection.push(todo);
    }
}
