import {TasksStateType} from '../../app/App';
import {AddTodolistActionType, RemoveTodolistActionType, SetToDoListsType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeUpdateTaskType = ReturnType<typeof changeUpdateTaskAC>

export type SetTasksActionType = ReturnType<typeof setTasksAC>
type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeUpdateTaskType
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
            return {...state,
                [action.todolistId]:state[action.todolistId].filter(t => t.id != action.taskId)}
        }
        case 'ADD-TASK': {
            return {...state,[action.task.todoListId]:[action.task,...state[action.task.todoListId]]}
        }
        case 'CHANGE-TASK': {
            return {...state,
                [action.todolistId]:[...state[action.todolistId]
                    .map(t => t.id === action.taskId
                        ? {...t, ...action.model}
                        : t)
                ]
            }
        }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
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
//Action Creators
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)

export const addTaskAC = (task:TaskType)=> ({type: 'ADD-TASK', task} as const)

export const changeUpdateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({type: 'CHANGE-TASK', model, todolistId, taskId} as const)

export const setTasksAC = (todolistId: string,tasks:TaskType[]) => ({ type: "SET-TASKS", todolistId, tasks} as const)
//fetch (Thunk Creators)
export const fetchTasksTC=(toDoListId:string)=>(dispatch:Dispatch<ActionsType>)=>{
            todolistsApi.getTasks(toDoListId).then((res)=>{
                dispatch(setTasksAC(toDoListId,res.data.items))
            });
    }

export const fetchDeleteTaskTC = (todolistId:string, id:string)=>(dispatch:Dispatch<ActionsType>)=>{
        todolistsApi.deleteTask(todolistId,id).then((res)=>{
            dispatch(removeTaskAC(id, todolistId));
        });
    }

export const fetchAddTaskTC = (title: string, todolistId: string)=>(dispatch:Dispatch<ActionsType>)=>{
        todolistsApi.createTask(todolistId,title).then((res)=>{
            dispatch(addTaskAC(res.data.data.item))
        });
    }
export type UpdateDomainTaskModelType={
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string,
}
export const fetchUpdateTaskTC = (id: string, model: UpdateDomainTaskModelType, todolistId: string)=>{
    return (dispatch:Dispatch<ActionsType>,getState:() => AppRootStateType)=>{
        const state = getState();
        const task = state.tasks[todolistId].find((t)=> t.id ===id)
        if (!task){
            throw new Error('Task not found in state!')
            return
        }
        let updateObjectModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model
        };
        todolistsApi.updateTask(todolistId, id,updateObjectModel)
            .then((res) => {
                dispatch(changeUpdateTaskAC(id, model , todolistId))
            })
    }
}
