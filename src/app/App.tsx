import React, {FC} from 'react'
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from "../api/todolists-api";
import {ToDoListsList} from "../features/ToDoList/ToDoListsList";
import LinearProgress from "@material-ui/core/LinearProgress";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./app-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type AppPropsType={
    demo?:boolean
}

function App({demo=false}:AppPropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                <CustomizedSnackbars/>
                {
                    status === 'loading'
                        ?<LinearProgress />
                        :<></>
                }

            </AppBar>
            <Container fixed>
               <ToDoListsList demo={demo}/>
            </Container>
        </div>
    );
}

export default App;
