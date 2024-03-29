import axios from "axios";

//Types
export interface ToDoListType {
    id:string,
    title:string,
    addedDate?:string,
    order?:number
}
interface ResponseType<D={}> {
    resultCode: number
    messages: string[],
    data: D
}
interface getTasksResponseType {
    items:TaskType[],
    totalCount:number,
    error:null|string
}

export enum TaskStatuses{
    New=0,
    InProgress=1,
    Completed=2,
    Draft=3,
}
export enum TaskPriorities{
    Low=0,
    Middle  =1,
    Hi=2,
    Urgently=3,
    Later=4,
}
export type TaskType={
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType={
    title: string,
    description: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
}


//API
const settings ={
    withCredentials:true,
    headers: {
        "API-KEY": "b9b7089a-50e1-465a-841d-4c21932deda9",
    }
}
const instance=axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const todolistsApi={
    getToDoLists(){
       return  instance.get<Array<ToDoListType>>('todo-lists')
    },
    createToDoList(title:string='Не введен заголовок'){
        return instance.post<ResponseType<{ item: ToDoListType }>>('todo-lists',{title})
    },
    deleteToDoList(id:string){
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateToDoListTitle(toDoListId:string,title:string){
        return instance.put<ResponseType>(`todo-lists/${toDoListId}`,{title})
    },
    getTasks(toDoListId:string){
        return  instance.get<getTasksResponseType>(`todo-lists/${toDoListId}/tasks`)
    },
    deleteTask(toDoListId:string,taskId:string){
        return  instance.delete<ResponseType>(`todo-lists/${toDoListId}/tasks/${taskId}`)
    },
    createTask(toDoListId:string,title:string){
        return  instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${toDoListId}/tasks`,{title})
    },
    updateTask(toDoListId:string,taskId:string,updateObjectModel:any){
        return instance.put<ResponseType>(`todo-lists/${toDoListId}/tasks/${taskId}`,{...updateObjectModel})
    },
}