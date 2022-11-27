import axios from "axios";
const settings ={
    withCredentials:true,
    headers: {
        "API-KEY": "b9b7089a-50e1-465a-841d-4c21932deda9"
    }
}
export const todolistsApi={
    getToDoLists(){
       return  axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',settings)
    },
    сreateTodolist(title:string='Не введен заголовок'){
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title}, settings)
    }
}