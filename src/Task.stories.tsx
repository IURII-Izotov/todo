
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import React from "react";
import {v1} from "uuid";


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
            task={{id:v1(),isDone:true,title:'CSS'}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={"toDoListId1"}
        />
        <Task
            task={{id:v1(),isDone:false,title:'JS'}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={"toDoListId2"}
        />
        </>
}