import React, {useState} from 'react';
import './App.css';
import { TaskType, ToDoList} from './ToDoList'
import {v1} from "uuid";
export type changeFilterType = 'all'|'active'|'completed'
function App() {

    let[tasks,setTasks]=useState<Array<TaskType>>([
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
    let [filter,setFilter] = useState<changeFilterType>('all');
    function changeFilter(value:changeFilterType){
       setFilter(value);
    }
    let tasksForToDoList = tasks;
    if(filter === 'active'){
        tasksForToDoList = tasks.filter((task)=>{
            return task.isDone === true
        })
    }
    if(filter === 'completed'){
        tasksForToDoList = tasks.filter((task)=>{
            return task.isDone === false
        })
    }


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
            <ToDoList updateCheckbox = {updateCheckbox}
                      addTask={addTask}
                      removeTasks={removeTasks}
                      title={'hello'}
                      tasks={tasksForToDoList}
                      changeFilter={changeFilter}
            />

        </div>
    );

}


export default App;
