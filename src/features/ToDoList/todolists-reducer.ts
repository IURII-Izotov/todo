import { todolistsApi, ToDoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, SetErrorType, setAppStatusAC, SetStatusType} from "../../app/app-reducer";

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
    | ReturnType<typeof changeTodolistEntityStatusAC>

type ThunkDispatchType = ActionsType | SetStatusType| SetErrorType
export type ToDoListDomainType= ToDoListType & {
    filter:FilterValuesType,
    entityStatus:RequestStatusType
}
const initialState: Array<ToDoListDomainType> =  []

export const todolistsReducer = (state: Array<ToDoListDomainType> = initialState, action: ActionsType): Array<ToDoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist,filter:'all',entityStatus:'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map((tl)=>tl.id === action.id ? {...tl,title: action.title}: tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map((tl)=> tl.id === action.id ? {...tl,filter : action.filter}:tl)
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            return state.map((tl)=> tl.id === action.id ? {...tl,entityStatus: action.status}:tl)
        }
        case "SET-TODOLISTS":{
            return action.toDoLists.map((tl)=>({...tl,filter:'all',entityStatus:'idle'}))
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
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
    return { type: 'CHANGE-TODOLIST-ENTITY-STATUS', id: id, status: status} as const
}
//fetch
export const fetchToDoListsTC = ()=>{
    return (dispatch:Dispatch<ThunkDispatchType>)=>{
        dispatch(setAppStatusAC('loading'))
        todolistsApi.getToDoLists()
            .then(res => {
                dispatch(SetToDoListsAC(res.data))
                dispatch(setAppStatusAC('idle'))
            });
    }
}

export const fetchRemoveTodolistTC = (toDoListId:string)=>{

    return (dispatch:Dispatch<ThunkDispatchType>)=>{
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(toDoListId,'loading'))
        todolistsApi.deleteToDoList(toDoListId)
            .then((res)=>{
                dispatch(removeTodolistAC(toDoListId));
                dispatch(setAppStatusAC('idle'))
            })
    }
}

export const fetchAddTodolistTC = (title:string)=>{
    return (dispatch:Dispatch<ThunkDispatchType>)=>{
        dispatch(setAppStatusAC('loading'))
        todolistsApi.createToDoList(title).then((res)=>{
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('idle'))
        })
    }
}

export const fetchСhangeTodolistTitleTC = (toDoListId:string, title:string)=>{
    return (dispatch:Dispatch<ThunkDispatchType>)=>{
        dispatch(setAppStatusAC('loading'))
        todolistsApi.updateToDoListTitle(toDoListId,title)
            .then((res)=>{
                dispatch(changeTodolistTitleAC(toDoListId,title))
                dispatch(setAppStatusAC('idle'))
            })
    }
}
