import React, {FC, useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    changeTodolistFilterAC,
    fetchAddTodolistTC,
    fetchRemoveTodolistTC,
    fetchToDoListsTC,
    fetchСhangeTodolistTitleTC
} from "./todolists-reducer";
import {fetchAddTaskTC, fetchDeleteTaskTC, fetchUpdateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {ToDoList} from "./ToDoList";
import {FilterValuesType, TasksStateType, TodolistType} from "../../app/App";

export const ToDoListsList: FC = (props) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchToDoListsTC());
    }, []);

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        dispatch(fetchDeleteTaskTC(todolistId, taskId));
    }, [dispatch]);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const action = fetchAddTaskTC(title, todolistId);
        dispatch(action);
    }, [dispatch]);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const action = fetchUpdateTaskTC(id, {status}, todolistId);
        dispatch(action);
    }, [dispatch]);

    const changeTaskTitle = useCallback(function (id: string, title: string, todolistId: string) {
        const action = fetchUpdateTaskTC(id, {title}, todolistId);
        dispatch(action);
    }, [dispatch]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(fetchRemoveTodolistTC(id));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((toDoListId: string, title: string) => {
        dispatch(fetchСhangeTodolistTitleTC(toDoListId, title))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = fetchAddTodolistTC(title);
        dispatch(action);
    }, [dispatch]);

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        let tasksForTodolist = allTodolistTasks;

                        return <Grid item key={tl.id}>
                            <Paper elevation={8} style={{padding: "10px"}}>
                                <ToDoList
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}

