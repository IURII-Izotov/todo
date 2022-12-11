
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import React from "react";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../../api/todolists-api";


export default {
    title: 'Task Component',
    component: Task
}
const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('change Task Title')
const removeTaskCallback = action('Remove task')

export const TaskBaseExample = (props:any)=>{
    return <>
        <Task
            task={
                {
                    id: v1(),
                    status: TaskStatuses.Completed,
                    title: 'CSS',
                    description: '',
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    todoListId: '',
                    order: 0,
                    addedDate: '',
                }}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={"toDoListId1"}
            disabled={false}
        />
        <Task
            task={{id:v1(),
                status:TaskStatuses.New,
                title:'JS',
                description:'',
                priority:TaskPriorities.Low,startDate:'',
                deadline:'',
                todoListId:'',
                order:0,
                addedDate:''}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={"toDoListId2"}
            disabled={false}
        />
        </>
}