import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {ErrorType, setAppErrorAC} from "../../app/app-reducer";


function Alert(props: AlertProps) {
    return <MuiAlert variant="filled" {...props} />;
}


export function CustomizedSnackbars() {
    const error = useSelector<AppRootStateType, ErrorType>(state => state.app.error)
    const dispatch =useDispatch();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };
    const isOpen = error !== null
    return (
            <Snackbar open={isOpen} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>

    );
}
