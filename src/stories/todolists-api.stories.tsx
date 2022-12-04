import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API'
}
const settings ={
    withCredentials:true,
    headers: {
        "API-KEY": "b9b7089a-50e1-465a-841d-4c21932deda9"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
      todolistsApi.getToDoLists().then((res)=>{
          setState(res.data)
      });


    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title='My Title'
        todolistsApi.createToDoList(title).then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let toDoListId='d0fd2656-2d56-4c8a-8b9f-59781bab3242';
        todolistsApi.deleteToDoList(toDoListId)
            .then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let toDoListId='f19e258f-5f65-4554-8b9d-5a836c423d76';
        let title = 'Update Title!'
        todolistsApi.updateToDoListTitle(toDoListId,title)
            .then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = 'a539f888-44d3-4223-9524-8a8869a2d163'
        todolistsApi.getTasks(id).then((res)=>{
            setState(res.data.items)
        });


    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const toDoListId = ''
        const taskId = ''
        todolistsApi.deleteTask(toDoListId,taskId).then((res)=>{
            setState(res.data)
        });


    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const toDoListId = 'a539f888-44d3-4223-9524-8a8869a2d163'
        const title = 'HOKK'
        todolistsApi.createTask(toDoListId,title).then((res)=>{
            setState(res.data)
        });


    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>('')
    const [stateTask, setStateTask] = useState<any>('')
    const [title, setTitle] = useState<any>('')

    const onChangeInput=(e:any)=>{
        setState(e.target.value);
    }
    const onChangeInputTask = (e:any)=>{
        setStateTask(e.target.value);
    }
    const onChangeTitle=(e:any)=>{
        setTitle(e.target.value)
    }
    const onClickButton=()=>{
        let toDoListId=state;
        const taskId = stateTask;
        let updateObjectModel = {
            title: title,
            description: '(£*£)',
            status: 0,
            priority: 1,
            startDate: '',
            deadline: '',
        };

        todolistsApi.updateTask(toDoListId,taskId,updateObjectModel)
            .then((res)=>{
                setState(res.data)
            })
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input type="text" placeholder="ToDoList" value={state} onChange={onChangeInput}/>
        <input type="text" placeholder="Task" value={stateTask} onChange={onChangeInputTask}/>
        <input type="text" placeholder="Title" value={title} onChange={onChangeTitle}/>
        <button onClick={onClickButton}>Update</button>
        </>

}