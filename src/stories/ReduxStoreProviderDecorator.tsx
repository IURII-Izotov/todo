import {AppRootStateType} from "../app/store";
import {Provider} from "react-redux";
import React from "react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/ToDoList/tasks-reducer";
import {todolistsReducer} from "../features/ToDoList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                description:'',priority:TaskPriorities.Low,startDate:'',deadline:'',todoListId:'',order:0,addedDate:''},
            {id: v1(), title: "JS", status: TaskStatuses.Completed,
                description:'',priority:TaskPriorities.Low,startDate:'',deadline:'',todoListId:'',order:0,addedDate:''}
        ],
        ['todolistId2']: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                description:'',priority:TaskPriorities.Low,startDate:'',deadline:'',todoListId:'',order:0,addedDate:''},
            {id: v1(), title: "JS", status: TaskStatuses.Completed,
                description:'',priority:TaskPriorities.Low,startDate:'',deadline:'',todoListId:'',order:0,addedDate:''}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator=(storyFn:any)=>{
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}