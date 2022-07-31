import {combineReducers, createStore} from 'redux'
import {todolistsReducer} from "./todolists-reduser";
import {tasksReducer} from "./tasks-reduser";

const rootReducer = combineReducers({
    toDoLists:todolistsReducer,
    tasks:tasksReducer

})
export type appRootState = ReturnType<typeof rootReducer>
export let store = createStore(rootReducer)
