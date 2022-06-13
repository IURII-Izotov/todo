import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
type EditableSpanPropsType = {
    title: string,
    onChange:(newValue:string)=> void
}

export function EditableSpan(props: EditableSpanPropsType) {
   let [editMode,setEditMode] = useState(false)
    let [title,setTitle] = useState('')
    let activateEditMode=()=>{
        setEditMode(true);
        setTitle(props.title);

    }
    let activateViewMode=()=>{
        setEditMode(false);
        props.onChange(title);
    }
    let onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value);

    }
    let onClickButtonInput = ()=>{
        setTitle(title);

    }
    return editMode?
        <>
            <TextField onChange={onChangeTitleHandler} value={title} onBlur={activateViewMode} id="outlined-basic" label="Text" variant="outlined" autoFocus/>
            <IconButton onClick={onClickButtonInput}>
                <CheckIcon color={"success"}/>
            </IconButton>
        </>
    :
    <span onDoubleClick={activateEditMode} >{props.title}</span>

}