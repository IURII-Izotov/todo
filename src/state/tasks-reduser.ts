import {TasksStateType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddToDoListActionType, RemoveToDoListActionType, toDoList1, toDoList2} from "./todolists-reduser";
import {act} from "react-dom/test-utils";

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
export type changeTaskTitleActionType = {
    type:'CHANGE-TASK-TITLE',
    toDoListId:string,
    title:string,
    taskID:string
}
type ActionsType = removeTaskActionType|addTaskActionType|changeTaskStatusActionType
|changeTaskTitleActionType|AddToDoListActionType|RemoveToDoListActionType

let initialStateTasks : TasksStateType= {
    [toDoList1]: [
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},],
    [toDoList2]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "11111", isDone: false},
        {id: v1(), title: "22222", isDone: false},
    ]
}
export const tasksReducer = (state: TasksStateType = initialStateTasks, action:ActionsType ):TasksStateType=> {
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
            copyState[action.toDoListId] = tasks.map((t) =>{
                console.log(t.id)
               if(t.id == action.taskID){
                   return {...t,isDone:action.status}
               }
                return t
            })
            return copyState
        }
        case 'CHANGE-TASK-TITLE': {
            let copyState = {...state};
            let tasks = state[action.toDoListId];
            let findTask=tasks.find(t=> t.id == action.taskID)
            if(findTask){
                findTask.title = action.title;
            }

            return copyState
        }
        case "ADD-TODOLIST":{
            let copyState = {...state};
            copyState[action.todolistId] = []
            return copyState
        }
        case "REMOVE-TODOLIST":{
            let copyState = {...state};
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
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
export const changeTaskTitleAC = (taskID:string,title:string,toDoListId:string) : changeTaskTitleActionType=> {
    return {type:'CHANGE-TASK-TITLE', taskID, title,toDoListId}
}
