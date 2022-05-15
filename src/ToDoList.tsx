import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {changeFilterType} from "./App";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,

}
type ToDoListPropsType = {
    title?: string,
    tasks: Array<TaskType>,
    removeTasks: (id: string) => void,
    addTask: (title: string) => void
    updateCheckbox:(id: string) => void
    changeFilter:(value: changeFilterType) => void
}


export let ToDoList = (props: ToDoListPropsType) => {

    let [error,setError] =useState(null);

    let [title, setTitle] = useState('')
    let onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }
    let onKeyPressAddTaskHandler = () => {
        props.addTask(title);
        setTitle('')
    }
    let onClickAddTask = ()=> {
        props.addTask(title);
        setTitle('')
    }
    let onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            onKeyPressAddTaskHandler();
        }
    }

    let onAllClickHandler = ()=>props.changeFilter('all')
    let onActiveClickHandler = ()=>props.changeFilter('active')
    let onCompletedClickHandler = ()=>props.changeFilter('completed')


    let onClickButtonRemoveTasksHandler = (id:string)=>{
        props.removeTasks(id)
    }
    let onClickButtonCheck=(id:string)=>{
        props.updateCheckbox(id)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onKeyPress={onKeyPressHandler} onChange={onChangeInputHandler}/>
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((item) => {
                    return (
                        <li id={`${item.id}`} key={item.id}>
                            <button onClick={()=>onClickButtonRemoveTasksHandler(item.id)}>Delete
                            </button>
                            <input onClick={()=>{onClickButtonCheck(item.id)}} type="checkbox" checked={item.isDone}/>
                            <span>{item.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler} >All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}