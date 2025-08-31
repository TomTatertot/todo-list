import Task from "./Task.js"

export function addTask(taskList, ...taskData) {
    taskList.push(new Task(...taskData));
}

export function removeTaskByID(taskList, taskID) {
    let taskIndex = taskList.findIndex(task => task.ID === taskID);
    if (taskIndex !== -1)
        taskList.splice(taskIndex, 1);
}

export function getTaskById(taskList, taskID){
    return taskList.find(task => task.ID === taskID);
}