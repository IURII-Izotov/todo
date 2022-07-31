import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from './ToDoList'
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeToDoListFilterAC,
    changeToDoListTitleAC,
    removeTodolistAC, toDoList1, toDoList2,
    todolistsReducer
} from "./state/todolists-reduser";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reduser";
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
    function addNewToDoList(title:string) {
        let action = addTodolistAC(title)
        dispatch(action);
    }

    return (
        <div className="App">
            <AddItemForm addItem={addNewToDoList}/>
            {
                todoListsArray.map((tl) => {
                    // let tasksForToDoList = tasksObj[tl.id];
                    //
                    // if (tl.filter === 'active') {
                    //     tasksForToDoList = tasksForToDoList.filter((task) => task.isDone)
                    // }
                    // if (tl.filter === 'completed') {
                    //     tasksForToDoList = tasksForToDoList.filter((task) => !task.isDone)
                    // }

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
    );

}



