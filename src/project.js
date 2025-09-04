import { el } from "date-fns/locale";
import Task from "./task/Task.js";
import {addTask, removeTaskByID, getTaskById} from "./task/taskList.js";

export default class Project{
    ID = crypto.randomUUID();
    taskList = [];

    constructor(name){
        this.name = name;
    }
}