import {changeFilterType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";

export type RemoveToDoListActionType = {
    type:'REMOVE-TODOLIST',
    id:string
}
export type AddToDoListActionType = {
    type:'ADD-TODOLIST',
    title:string,
    todolistId:string
}
export type ChangeToDoListTitleActionType = {
    type:'CHANGE-TODOLIST-TITLE',
    id:string,
    title:string
}
export type ChangeToDoListFilterActionType = {
    type:'CHANGE-TODOLIST-FILTER',
    id:string,
    filter:changeFilterType
}

type ActionsType = RemoveToDoListActionType|AddToDoListActionType|
    ChangeToDoListTitleActionType|ChangeToDoListFilterActionType
export let toDoList1 = v1();
export let toDoList2 = v1();
const initialStateToDoLists:Array<TodolistType> = [
    {id: toDoList1, title: 'hello', filter: 'active'},
    {id: toDoList2, title: 'hi', filter: 'completed'}
]
export const todolistsReducer = (state: Array<TodolistType>= initialStateToDoLists, action:ActionsType ):Array<TodolistType>=> {

    switch (action.type){
        case 'REMOVE-TODOLIST':
           return state.filter(({id})=>{
                return id !== action.id
            });
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: 'all'},...state]
        case 'CHANGE-TODOLIST-TITLE':
            let findToDoList=state.find(tl => tl.id == action.id)
            if (findToDoList){
                findToDoList.title = action.title;
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            let findToDoListFilter=state.find(tl => tl.id == action.id);
            if (findToDoListFilter){
                findToDoListFilter.filter = action.filter;
            }
            return [...state]
        default:
            return state
    }
}
export const removeTodolistAC = (toDoListId:string) : RemoveToDoListActionType=>{
return {type: 'REMOVE-TODOLIST', id: toDoListId}
}
export const addTodolistAC = (newTodolistTitle:string) : AddToDoListActionType=>{
    return {type: 'ADD-TODOLIST', title: newTodolistTitle, todolistId: v1()}
}
export const changeToDoListTitleAC = (toDoListId:string,toDoListTitle:string) : ChangeToDoListTitleActionType=>{
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: toDoListId,
        title: toDoListTitle
    }
}
export const changeToDoListFilterAC = (toDoListId:string,toDoListFilter:changeFilterType) : ChangeToDoListFilterActionType=>{
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: toDoListId,
        filter: toDoListFilter
    }
}