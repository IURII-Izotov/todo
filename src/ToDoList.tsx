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
    filter:changeFilterType
}


export let ToDoList = (props: ToDoListPropsType) => {

    let [error,setError] =useState<string>('');

    let [title, setTitle] = useState('')
    let onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setTitle(event.currentTarget.value);
    }
    let onKeyPressAddTaskHandler = () => {
        props.addTask(title.trim());
        setTitle('')
    }
    let errorText= 'Title is require'
    let onClickAddTask = ()=> {
        if(title.trim() === ''){
            setError(errorText)
            return
        }
        props.addTask(title.trim());
        setTitle('')
    }
    let onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(title.trim() === ''){
            setError( errorText)
            return
        }
        if (event.key == 'Enter') {
            onKeyPressAddTaskHandler();
        }
    }

    let onAllClickHandler = ()=>props.changeFilter('all')
    let onActiveClickHandler = ()=>props.changeFilter('active')
    let onCompletedClickHandler = ()=>props.changeFilter('completed')



    let onClickButtonCheck=(id:string)=>{
        props.updateCheckbox(id)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error? "border-error":''} value={title} onKeyPress={onKeyPressHandler} onChange={onChangeInputHandler}/>
                <button onClick={onClickAddTask}>+</button>
                <div className='error'>{error}</div>
            </div>
            <ul>
                {props.tasks.map((item) => {
                    let onClickButtonRemoveTasksHandler = ()=>{
                        props.removeTasks(item.id)
                    }
                    return (
                        <li className={item.isDone ? 'is-done': ''} id={`${item.id}`} key={item.id}>
                            <button onClick={onClickButtonRemoveTasksHandler}>Delete
                            </button>
                            <input onClick={()=>{onClickButtonCheck(item.id)}} type="checkbox" checked={item.isDone}/>
                            <span>{item.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter': ''}
                        onClick={onAllClickHandler} >All</button>
                <button className={props.filter === 'active' ? 'active-filter': ''}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter': ''}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}