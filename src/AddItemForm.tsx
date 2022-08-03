import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

type AddItemForm={
    addItem:(title:string)=> void
}

export const AddItemForm = React.memo((props:AddItemForm) => {
    console.log('Инпут добавления тудулиста')
    let [title, setTitle] = useState('')
    let [error,setError] =useState<string | null>('');
    let errorText= 'Title is require'
    const addItem = ()=> {
        if(title.trim() === ''){
            setError(errorText)
            return
        }
        props.addItem(title.trim());
        setTitle('')
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if( error !== null){
            setError(null);
        }

        setTitle(event.currentTarget.value);
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>)=>{
        setError(null);
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
}
);

