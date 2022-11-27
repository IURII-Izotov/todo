import React, {useEffect, useState} from 'react'
import axios from "axios";
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
        todolistsApi.сreateTodolist(title).then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let toDoListId='0561850c-504b-4fd8-9590-2284a2b8bc3b';
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${toDoListId}`, settings).
        then((res)=>{
            setState(res)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let toDoListId='0561850c-504b-4fd8-9590-2284a2b8bc3b';
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${toDoListId}`,{title:'111112'}, settings).
        then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}