import React, {ChangeEvent} from 'react'
import {changeFilterType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import { Delete } from '@mui/icons-material';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reduser";
import {useDispatch, useSelector} from "react-redux";
import {appRootState} from "./state/store";
import {TasksStateType} from "./AppWithRedux";



export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,

}
type ToDoListPropsType = {
    id:string
    title ?: string| undefined,
    changeToDoListTitle:(newTitle:string,toDoListId: string) => void
    changeFilter:(value: changeFilterType,toDoListId:string) => void
    filter:changeFilterType,
    removeToDoList: (id:string)=> void
}


export let ToDoList = (props: ToDoListPropsType) => {
    const tasksObj = useSelector<appRootState,Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    // let updateCheckbox = (id: string,isDone:boolean, toDoListId: string) => {
    //     dispatch(changeTaskStatusAC(id,isDone,toDoListId));
    // }



    const onAllClickHandler = ()=>props.changeFilter('all',props.id)
    const onActiveClickHandler = ()=>props.changeFilter('active',props.id)
    const onCompletedClickHandler = ()=>props.changeFilter('completed',props.id)
    const removeTodoList = ()=>{
        props.removeToDoList(props.id)
    }
    const changeToDoListTitle=(newTitle:string)=>{
        props.changeToDoListTitle(props.id,newTitle)
    }
    let tasksForToDoList = tasksObj;

    if (props.filter === 'active') {
        tasksForToDoList = tasksForToDoList.filter((task) => !task.isDone)
    }
    if (props.filter === 'completed') {
        tasksForToDoList = tasksForToDoList.filter((task) => task.isDone)
    }

    return (
        <div>
            <h3><EditableSpan onChange={changeToDoListTitle} title={props.title !}/>
                <IconButton onClick={removeTodoList} aria-label="delete">
                    <Delete />
                </IconButton>
            </h3>
                <AddItemForm addItem={(title)=>dispatch(addTaskAC(title,props.id))}/>
            <>
                {tasksForToDoList.map((item) => {
                    let onClickButtonRemoveTasksHandler = ()=>{
                        dispatch(removeTaskAC(props.id,item.id,));
                    }
                    let onChangeStatusHandler=(e:ChangeEvent<HTMLInputElement>)=>{
                        dispatch(changeTaskStatusAC(item.id,e.currentTarget.checked ,props.id));
                    }
                    let onChangeTitleHandler=(newValue:string)=>{
                        dispatch(changeTaskTitleAC(item.id,newValue,props.id));
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


