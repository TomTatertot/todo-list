export default class Task{
    ID  = crypto.randomUUID();
    completed = false;
 
    constructor({title, description, dueDate, priority}){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;   
    }

    toggleCompleted(){
        this.completed = !this.completed;
    }

    update({title, description, dueDate, priority}){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }



}                          