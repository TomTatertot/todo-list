import Task from "./Task.js"

export function addTaskToList(taskList, taskObj) {
    taskList.push(taskObj);
}

export function removeTaskByID(taskList, taskID) {
    let taskIndex = taskList.findIndex(task => task.ID === taskID);
    if (taskIndex !== -1)
        taskList.splice(taskIndex, 1);
}

export function getTaskById(taskList, taskID){
    return taskList.find(task => task.ID === taskID);
}