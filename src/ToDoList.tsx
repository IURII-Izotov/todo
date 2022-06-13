import React, {ChangeEvent} from 'react'
import {changeFilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import { Delete } from '@mui/icons-material';



export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,

}
type ToDoListPropsType = {
    id:string
    title ?: string| undefined,
    tasks: Array<TaskType>,
    removeTasks: (id: string,toDoListId:string) => void,
    addTask: (title: string,toDoListId: string) => void
    updateCheckbox:(id: string,isDone:boolean,toDoListId: string) => void
    changeTaskTitle:(id: string,newTitle:string,toDoListId: string) => void
    changeToDoListTitle:(newTitle:string,toDoListId: string) => void
    changeFilter:(value: changeFilterType,toDoListId:string) => void
    filter:changeFilterType,
    removeToDoList: (id:string)=> void
}


export let ToDoList = (props: ToDoListPropsType) => {

        const addTask=(title:string)=>{
            props.addTask(title,props.id);
        }

    const onAllClickHandler = ()=>props.changeFilter('all',props.id)
    const onActiveClickHandler = ()=>props.changeFilter('active',props.id)
    const onCompletedClickHandler = ()=>props.changeFilter('completed',props.id)
    const removeTodoList = ()=>{
        props.removeToDoList(props.id)
    }
    const changeToDoListTitle=(newTitle:string)=>{
        props.changeToDoListTitle(props.id,newTitle)
    }
    return (
        <div>
            <h3><EditableSpan onChange={changeToDoListTitle} title={props.title !}/>
                <IconButton onClick={removeTodoList} aria-label="delete">
                    <Delete />
                </IconButton>
            </h3>
                <AddItemForm addItem={addTask}/>
            <>
                {props.tasks.map((item) => {
                    let onClickButtonRemoveTasksHandler = ()=>{
                        props.removeTasks(item.id,props.id)
                    }
                    let onChangeStatusHandler=(e:ChangeEvent<HTMLInputElement>)=>{
                        props.updateCheckbox(item.id, e.currentTarget.checked ,props.id)
                    }
                    let onChangeTitleHandler=(newValue:string)=>{
                        props.changeTaskTitle(item.id, newValue ,props.id)
                    }
                    return (
                        <div className={item.isDone ? 'is-done': ''} id={`${item.id}`} key={item.id}>

                            <Checkbox onChange={onChangeStatusHandler} color="success" checked={item.isDone}/>
                            <EditableSpan onChange={onChangeTitleHandler} title={item.title}/>

                            <IconButton onClick={onClickButtonRemoveTasksHandler} aria-label="delete" size="small">
                                <Delete color={"error"} fontSize="small" />
                            </IconButton>
                        </div>
                    )
                })}
            </>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined': 'text'}
                        onClick={onAllClickHandler} >All</Button>
                <Button variant={props.filter === 'active' ? 'outlined': 'text'}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === 'completed' ? 'outlined': 'text'}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}


