import {changeFilterType, todoListsType} from "../App";
import {v1} from "uuid";

export type RemoveToDoListActionType = {
    type:'REMOVE-TODOLIST',
    id:string
}
export type AddToDoListActionType = {
    type:'ADD-TODOLIST',
    title:string
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

export const toDoListsReducer = (state: todoListsType[], action:ActionsType )=> {
    switch (action.type){
        case 'REMOVE-TODOLIST':
           return state.filter(({id})=>{
                return id !== action.id
            });
        case 'ADD-TODOLIST':
            return [...state,{id: v1(), title: action.title, filter: 'all'}]
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
            throw new Error("I don't understand this action type")
    }
}
export const removeToDoListAC = (toDoListId:string) : RemoveToDoListActionType=>{
return {type: 'REMOVE-TODOLIST', id: toDoListId}
}
export const addToDoListAC = (newTodolistTitle:string) : AddToDoListActionType=>{
    return {type: 'ADD-TODOLIST', title: newTodolistTitle}
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