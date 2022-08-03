import React, {useCallback} from 'react';
import './App.css';
import {TaskType, ToDoList} from './ToDoList'
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeToDoListFilterAC,
    changeToDoListTitleAC,
    removeTodolistAC

} from "./state/todolists-reduser";

import {useDispatch, useSelector} from "react-redux";
import {appRootState} from "./state/store";

export type changeFilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string,
    title: string,
    filter: changeFilterType
}
export type TasksStateType = {
    [key:string]:TaskType[]
}
export function AppWithRedux() {
    console.log('App')
    const dispatch = useDispatch()
    const todoListsArray = useSelector<appRootState, Array<TodolistType>>(state => state.toDoLists)


    function changeFilter(value: changeFilterType, toDoListId: string) {
       let action = changeToDoListFilterAC(toDoListId,value)
        dispatch(action);
    }

    // let updateCheckbox = (id: string,isDone:boolean, toDoListId: string) => {
    //     let action = changeTaskStatusAC(id,isDone,toDoListId)
    //     dispatch(action);
    // }
    // function addTask(title: string,toDoListId: string) {
    //     let action = addTaskAC(title,toDoListId)
    //     dispatch(action);
    //
    // }
    // let changeTaskTitle= (id: string,newValue:string, toDoListId: string) => {
    //     dispatch(changeTaskTitleAC(id,newValue,toDoListId));
    //
    // }
    // let removeTasks = (newID: string, toDoListId: string) => {
    //     let action = removeTaskAC(toDoListId,newID)
    //     dispatch(action);
    // }

    let changeToDoListTitle =(toDoListId:string,newTitle: string)=>{
        let action = changeToDoListTitleAC(toDoListId,newTitle)
        dispatch(action);
    }
    let removeToDoList = (toDoListId:string)=>{
        let action = removeTodolistAC(toDoListId)
        dispatch(action);

    }
    const addNewToDoList=useCallback((title:string)=>{
        let action = addTodolistAC(title)
        dispatch(action);
    },[])

    return (
        <div className="App">
            <AddItemForm addItem={addNewToDoList}/>
            <div className='tasks-wrapper'>
            {
                todoListsArray.map((tl) => {
                    return <ToDoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        changeFilter={changeFilter}
                        filter={tl.filter}
                        removeToDoList={removeToDoList}
                        changeToDoListTitle={changeToDoListTitle}
                    />
                })
            }
            </div>

        </div>
    );

}



