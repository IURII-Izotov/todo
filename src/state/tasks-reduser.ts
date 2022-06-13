import {TasksStateType, todoListsType} from "../App";
import {v1} from "uuid";

export type removeTaskActionType = {
    type:'REMOVE-TASK',
    toDoListId:string,
    taskID:string
}
export type addTaskActionType = {
    type:'ADD-TASK',
    taskTitle:string,
    toDoListId:string
}
export type changeTaskStatusActionType = {
    type:'CHANGE-TASK-STATUS',
    toDoListId:string,
    status:boolean,
    taskID:string
}
type ActionsType = removeTaskActionType|addTaskActionType|changeTaskStatusActionType

export const tasksReducer = (state: TasksStateType, action:ActionsType )=> {

    switch (action.type){
        case 'REMOVE-TASK': {
            let copyState = {...state};
            let tasks = state[action.toDoListId];
            const filteredTasks = tasks.filter((t) => t.id !== action.taskID)
            copyState[action.toDoListId] = filteredTasks;
            return copyState
        }
        case 'ADD-TASK': {
            let copyState = {...state};
            let tasks = state[action.toDoListId];
            tasks = [{id: v1(), title: action.taskTitle, isDone: false},...tasks]
            copyState[action.toDoListId] = tasks
            return copyState
        }
        case 'CHANGE-TASK-STATUS': {
            let copyState = {...state};
            let tasks = state[action.toDoListId];
            let findTask=tasks.find(t=> t.id == action.taskID)
            if(findTask){
                findTask.isDone = action.status;
            }

            return copyState
        }
        default:
            throw new Error("I don't understand this action type")
    }
}
export const removeTaskAC = (toDoListId:string,taskID:string) : removeTaskActionType=>{
    return {type: 'REMOVE-TASK', toDoListId : toDoListId,taskID:taskID}
}

export const addTaskAC = (taskTitle:string,toDoListId:string) : addTaskActionType=> {
    return {type: 'ADD-TASK', taskTitle, toDoListId}
}
export const changeTaskStatusAC =(taskID:string,status:boolean,toDoListId:string) : changeTaskStatusActionType=> {
    return {type:'CHANGE-TASK-STATUS', taskID, status,toDoListId}
}