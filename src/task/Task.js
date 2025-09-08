
export default class Task{
    ID  = crypto.randomUUID();
 
    constructor({title, description, date, priority, completed = false}){
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority; 
        this.completed = completed;  
    }

    update({title, description, date, priority, completed = false}){
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.completed = completed;  
    }
}                          