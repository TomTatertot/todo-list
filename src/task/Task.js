export default class Task{
    ID  = crypto.randomUUID();
    completed = false;
 
    constructor({title, description, date, priority}){
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;   
    }

    toggleCompleted(){
        this.completed = !this.completed;
    }

    update({title, description, date, priority}){
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }
}                          