import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from './ToDoList'
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type changeFilterType = 'all' | 'active' | 'completed'

export type todoListsType = {
    id: string,
    title: string,
    filter: changeFilterType
}
export type TasksStateType = {
    [key:string]:TaskType[]
}
function App() {
    let toDoList1 = v1();
    let toDoList2 = v1();

    let [todoListsArray, setTodoListsArray] = useState<todoListsType[]>([
        {id: toDoList1, title: 'hello', filter: 'active'},
        {id: toDoList2, title: 'hi', filter: 'completed'}
    ])
    let [tasksObj, setTasks] = useState<TasksStateType>({
        [toDoList1]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},],
        [toDoList2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "11111", isDone: false},
            {id: v1(), title: "22222", isDone: false},
        ]
    });
    function changeFilter(value: changeFilterType, toDoListId: string) {
        let todoList = todoListsArray.find(({id,filter})=>{
            return id === toDoListId
        })
        if (todoList){
            todoList.filter = value;
        }
        setTodoListsArray([...todoListsArray])
    }

    function addTask(title: string,toDoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[toDoListId];
        let newTasks = [task,...tasks]
        tasksObj[toDoListId]=newTasks;
        setTasks({...tasksObj});

    }

    let removeTasks = (newID: string, toDoListId: string) => {
        let tasks = tasksObj[toDoListId]

        let filteredTasks = tasks.filter((el) => el.id !== newID);
        tasksObj[toDoListId] = filteredTasks;
        setTasks({...tasksObj})
    }
    let updateCheckbox = (id: string,isDone:boolean, toDoListId: string) => {
        let tasks = tasksObj[toDoListId];
        let task  = tasks.find((el) => {
            return el.id == id
        })
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
        setTasks({...tasksObj})

    }
    let changeTaskTitle= (id: string,newValue:string, toDoListId: string) => {
        let tasks = tasksObj[toDoListId];
        let task  = tasks.find((el) => {
            return el.id == id
        })
        if (task) {
            task.title = newValue;
            setTasks({...tasksObj})
        }
        setTasks({...tasksObj})

    }
    let removeToDoList = (toDoListId:string)=>{
        let filteredToDoLists = todoListsArray.filter(({id})=>{
            return id !== toDoListId
        });
        delete tasksObj[toDoListId]
        setTodoListsArray(filteredToDoLists);
    }
    let changeToDoListTitle =(toDoListId:string,newTitle: string)=>{
       const toDoList = todoListsArray.find(tl=> tl.id == toDoListId);
       if (toDoList){
           toDoList.title = newTitle;
           setTodoListsArray([...todoListsArray])
       }
    }
    function addNewToDoList(title:string) {
        let newToDoListId= v1();
        let newToDoList:todoListsType =  {id: newToDoListId, title: title, filter: 'all'}
        setTodoListsArray([newToDoList,...todoListsArray])
        setTasks({
            ...tasksObj,
            [newToDoListId]:[]
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addNewToDoList}/>
            {
                todoListsArray.map((tl) => {
                    let tasksForToDoList = tasksObj[tl.id];

                    if (tl.filter === 'active') {
                        tasksForToDoList = tasksForToDoList.filter((task) => task.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksForToDoList = tasksForToDoList.filter((task) => !task.isDone)
                    }

                    return <ToDoList
                        key={tl.id}
                        id={tl.id}
                        updateCheckbox={updateCheckbox}
                        addTask={addTask}
                        removeTasks={removeTasks}
                        title={tl.title}
                        tasks={tasksForToDoList}
                        changeFilter={changeFilter}
                        filter={tl.filter}
                        removeToDoList={removeToDoList}
                        changeTaskTitle={changeTaskTitle}
                        changeToDoListTitle={changeToDoListTitle}

                    />
                })
            }


        </div>
    );

}


export default App;

