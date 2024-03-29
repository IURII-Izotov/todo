import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Delete} from '@material-ui/icons'
import {TaskStatuses, TaskType} from "../../../api/todolists-api";


type TaskPropsType = {
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
    disabled:boolean
}
export const Task = React.memo(({disabled,...props}: TaskPropsType) => {
    const onClickHandlerRemoveTask = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeHandlerTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;

        props.changeTaskStatus(props.task.id,
            newIsDoneValue ?
            TaskStatuses.Completed
            : TaskStatuses.New,
            props.todolistId)
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.changeTaskTitle, props.todolistId]);


    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandlerTaskStatus}
        />
        <EditableSpan disabled={disabled} value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandlerRemoveTask}>
            <Delete/>
        </IconButton>
    </div>
})
