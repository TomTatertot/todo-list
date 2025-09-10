export default class Project{

    constructor({name, taskList = []}){
        this.name = name;
        this.taskList = taskList;
    }
}