import { el } from "date-fns/locale";
import Task from "./task/Task.js";
import {addTask, removeTaskByID, getTaskById} from "./task/taskList.js";

export default class Project{

    constructor({name, taskList = []}){
        this.name = name;
        this.taskList = taskList;
    }
}