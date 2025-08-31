import { el } from "date-fns/locale";
import Task from "./task/Task.js";
import {addTask, removeTaskByID, getTaskById} from "./task/taskList.js";

export default class Project{
    taskList = [];

    constructor(name){
        this.name = name;
    }

    addTask(...task){
        addTask(this.taskList, ...task);
    }

    removeTaskByID(taskID){
        removeTaskByID(this.taskList, taskID);
    }

    getTaskById(taskID){
        return getTaskById(this.taskList, taskID);
    }
}