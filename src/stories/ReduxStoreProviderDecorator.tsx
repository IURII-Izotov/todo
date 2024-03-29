import {Provider} from "react-redux";
import React from "react";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/ToDoList/tasks-reducer";
import {todolistsReducer} from "../features/ToDoList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import thunk from "redux-thunk";
import {appReducer} from "../app/app-reducer";
import {AppRootStateType} from "../app/store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app:appReducer
})

const initialGlobalState:AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter:'all',entityStatus:'idle',addedDate:'',order:0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all',entityStatus:'loading',addedDate:'',order:0}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                description:'',priority:TaskPriorities.Low,startDate:'',deadline:'',todoListId:'',order:0,addedDate:''},
            {id: v1(), title: "JS", status: TaskStatuses.New,
                description:'',priority:TaskPriorities.Low,startDate:'',deadline:'',todoListId:'',order:0,addedDate:''}
        ],
        ['todolistId2']: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                description:'',priority:TaskPriorities.Low,startDate:'',deadline:'',todoListId:'',order:0,addedDate:''},
            {id: v1(), title: "JS", status: TaskStatuses.Completed,
                description:'',priority:TaskPriorities.Low,startDate:'',deadline:'',todoListId:'',order:0,addedDate:''}
        ]
    },
    app:{
        error:null,
        status:'idle',
    }
}

export const storyBookStore= createStore(rootReducer,initialGlobalState,applyMiddleware(thunk))

export const ReduxStoreProviderDecorator=(storyFn:any)=>{
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}