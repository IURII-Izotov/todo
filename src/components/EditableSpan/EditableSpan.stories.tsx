
import {action} from "@storybook/addon-actions";

import React from "react";
import {v1} from "uuid";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}
const changeCallback = action('Value changed')


export const EditableSpanBaseExample = (props:any)=>{
    return <EditableSpan value={'Start value'} onChange={changeCallback}/>
}