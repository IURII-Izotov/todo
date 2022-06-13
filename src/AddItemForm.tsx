import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

type AddItemForm={
    addItem:(title:string)=> void
}

export const AddItemForm = (props:AddItemForm) => {
    let [title, setTitle] = useState('')
    let [error,setError] =useState<string>('');
    let errorText= 'Title is require'
    let addItem = ()=> {
        if(title.trim() === ''){
            setError(errorText)
            return
        }
        props.addItem(title.trim());
        setTitle('')
    }
    let onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setTitle(event.currentTarget.value);
    }
    let onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>)=>{
        setError('');
        if(event.key === "Enter"){
            addItem();
        }
    }
    return (
        <div className='universalInput'>
            <TextField value={title}
                       onKeyPress={onKeyPressHandler}
                       onChange={onChangeInputHandler}
                       id="outlined-basic"
                       label="Type value"
                       variant="outlined"
                       error={!!error}
                       helperText={error}
            />

            <IconButton onClick={addItem}  color={"primary"}>
                <AddCircleIcon/>
            </IconButton>
        </div>
    );
};

