import { todolistsApi, ToDoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";

//types
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
            return [{...action.todolist,filter:'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map((tl)=>tl.id === action.id ? {...tl,title: action.title}: tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map((tl)=> tl.id === action.id ? {...tl,filter : action.filter}:tl)
        }
        case "SET-TODOLISTS":{
            return action.toDoLists.map((tl)=>({...tl,filter:'all'}))
        }
        default:
            return state;
    }
}
//AC
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
    return (dispatch:Dispatch<ActionsType>)=>{
        todolistsApi.getToDoLists()
            .then(res => {
                dispatch(SetToDoListsAC(res.data))
            });
    }
}

export const fetchRemoveTodolistTC = (toDoListId:string)=>{
    return (dispatch:Dispatch<ActionsType>)=>{
        todolistsApi.deleteToDoList(toDoListId)
            .then((res)=>{
                dispatch(removeTodolistAC(toDoListId));
            })
    }
}

export const fetchAddTodolistTC = (title:string)=>{
    return (dispatch:Dispatch<ActionsType>)=>{
        todolistsApi.createToDoList(title).then((res)=>{
            dispatch(addTodolistAC(res.data.data.item))
        })
    }
}

export const fetchСhangeTodolistTitleTC = (toDoListId:string, title:string)=>{
    return (dispatch:Dispatch<ActionsType>)=>{
        todolistsApi.updateToDoListTitle(toDoListId,title)
            .then((res)=>{
                dispatch(changeTodolistTitleAC(toDoListId,title))
            })
    }
}
