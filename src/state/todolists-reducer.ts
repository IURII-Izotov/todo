import {v1} from 'uuid';
import {todolistsApi, ToDoListType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "completed";

export type AddTodolistActionType= ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type SetToDoListsType = {
    type:'SET-TODOLISTS'
    toDoLists:ToDoListType[]
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetToDoListsType

export type ToDoListDomainType= ToDoListType & {
    filter:FilterValuesType;
}
const initialState: Array<ToDoListDomainType> =  []

export const todolistsReducer = (state: Array<ToDoListDomainType> = initialState, action: ActionsType): Array<ToDoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist:ToDoListDomainType={...action.todolist,filter:'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS":{
            return action.toDoLists.map((tl)=>{
                return {...tl,filter:'all'}
            })
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId}as const)
export const addTodolistAC = (todolist:ToDoListType) =>({ type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: title}
    ) as const

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
export const SetToDoListsAC = (toDoLists:ToDoListType[]):SetToDoListsType => ({type:'SET-TODOLISTS',toDoLists})

//fetch
export const fetchToDoListsTC = ()=>{
    return (dispatch:Dispatch)=>{
        todolistsApi.getToDoLists()
            .then(res => {
                dispatch(SetToDoListsAC(res.data))
            });
    }
}

export const fetchRemoveTodolistTC = (toDoListId:string)=>{
    return (dispatch:Dispatch)=>{
        todolistsApi.deleteToDoList(toDoListId)
            .then((res)=>{
                dispatch(removeTodolistAC(toDoListId));
            })
    }
}

export const fetchAddTodolistTC = (title:string)=>{
    return (dispatch:Dispatch)=>{
        todolistsApi.createToDoList(title).then((res)=>{
            dispatch(addTodolistAC(res.data.data.item))
        })
    }
}