import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {changeFilterType} from './App'

type ToDoListPropsType = {
    title?: string,
    tasks: Array<ObjectFromArray>,
    removeTasks: (id: string) => void,
    // changeFilter: (value: changeFilterType)  => void
    addTask: (title: string) => void
    updateCheckbox:(id: string) => void
}
export type ObjectFromArray = {
    id: string,
    title: string,
    isDone: boolean,
}

export let ToDoList = (props: ToDoListPropsType) => {

    let [filter,setFilter] = useState('All');
    let filteredTasks= props.tasks;
    if(filter == "Active"){
        filteredTasks = props.tasks.filter((el)=> el.isDone)
    }
    if(filter == "Completed"){
        filteredTasks = props.tasks.filter((el)=> !el.isDone)
    }

    let changeFilter = (value:changeFilterType)=>{
        setFilter(value);
    }


    let [title, setTitle] = useState('')
    let onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }
    let onKeyPressAddTaskHandler = () => {
        props.addTask(title);
        setTitle('')
    }
    let onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            onKeyPressAddTaskHandler();
        }
    }

    let onClickChangeFilterHandler = (value: changeFilterType) => {
        changeFilter(value);
    }
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
            </div>
            <ul>
                {filteredTasks && filteredTasks.map((item, index) => {
                    return (
                        <li id={`${index}`} key={index}>
                            <button onClick={()=>onClickButtonRemoveTasksHandler(item.id)}>Delete
                            </button>
                            <input onClick={()=>{onClickButtonCheck(item.id)}} type="checkbox" checked={item.isDone}/>
                            <span>{item.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => onClickChangeFilterHandler('All')}>All</button>
                <button onClick={() => onClickChangeFilterHandler('Active')}>Active</button>
                <button onClick={() => onClickChangeFilterHandler('Completed')}>Completed</button>
            </div>
        </div>
    )
}