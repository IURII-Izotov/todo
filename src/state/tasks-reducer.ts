import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetToDoListsType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi} from "../api/todolists-api";
import {Dispatch} from "redux";
import {useEffect, useState} from "react";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetToDoListsType
    | SetTasksActionType

const initialState: TasksStateType = {
    count: []
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType =action.task;
            console.log(newTask)
            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, status: action.status}
                    : t);
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t);
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS":{
            const copyState = {...state};
            action.toDoLists.forEach(tl =>{
                copyState[tl.id]=[]
            })
            return copyState;
        }
        case "SET-TASKS":{
            const copyState = {...state};
            copyState[action.todolistId]=action.tasks;
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)

export const addTaskAC = (task:TaskType)=> ({type: 'ADD-TASK', task} as const)

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const)

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const)

export const setTasksAC = (todolistId: string,tasks:TaskType[]) => ({ type: "SET-TASKS", todolistId, tasks} as const)
//fetch
export const fetchTasksTC=(toDoListId:string)=>{
    return (dispatch:Dispatch)=>{
            todolistsApi.getTasks(toDoListId).then((res)=>{
                dispatch(setTasksAC(toDoListId,res.data.items))
            });
    }
}

export const fetchDeleteTaskTC = (todolistId:string, id:string)=>{
    return (dispatch:Dispatch)=>{
        todolistsApi.deleteTask(todolistId,id).then((res)=>{
            dispatch(removeTaskAC(id, todolistId));
        });
    }
}

export const fetchAddTaskTC = (title: string, todolistId: string)=>{
    return (dispatch:Dispatch)=>{
        todolistsApi.createTask(todolistId,title).then((res)=>{
            dispatch(addTaskAC(res.data.data.item))
        });
    }
}

