import React, {useState} from 'react';
import './App.css';
import {ToDoList} from './ToDoList'
import {v1} from "uuid";
export type changeFilterType = 'All'|'Active'|'Completed'
function App() {

    let[tasks,setTasks]=useState([
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false},
    ])

    function addTask(title:string){
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks]);
    }
    let removeTasks=(newID:string)=>{
        setTasks(tasks.filter((el)=> el.id !== newID))
    }
    let updateCheckbox = (id:string)=>{
        setTasks(tasks.map(el=>{
            if(el.id == id){
                el.isDone = !el.isDone
            }
            return el
        }))

    }
    return (
        <div className="App">
            <ToDoList updateCheckbox = {updateCheckbox} addTask={addTask} removeTasks={removeTasks} title={'hello'} tasks={tasks}/>
            {/*<ToDoList addTask={addTask} changeFilter={changeFilter} removeTasks={removeTasks} title={'hello'} tasks={filteredTasks}/>*/}
        </div>
    );

}


export default App;
