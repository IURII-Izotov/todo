import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, SetToDoListsAC, ToDoListDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {tasksReducer} from "./tasks-reducer";
import {RequestStatusType} from "../../app/app-reducer";



let todolistId1: string;
let todolistId2: string;
let startState: Array<ToDoListDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all",entityStatus:'idle',order:0,addedDate:''},
        {id: todolistId2, title: "What to buy", filter: "all",entityStatus:'idle',order:0,addedDate:''}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New ToDoList";

    const endState = todolistsReducer(startState, addTodolistAC({id:'212',addedDate:'',title:newTodolistTitle,order:0}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New ToDoList";

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC(todolistId2, newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = "loading";

    const action = changeTodolistEntityStatusAC(todolistId2, newStatus);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});
test('todolistst should be set to the state', () => {
    const action = SetToDoListsAC(startState);

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});

test('empty arrays should be added', function() {
    const action = SetToDoListsAC([
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''}
    ])
    const endState = tasksReducer({}, action);
    const keys = Object.keys(endState);
    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])

});