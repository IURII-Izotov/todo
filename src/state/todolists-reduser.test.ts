import {
    addToDoListAC,
    changeToDoListFilterAC,
    changeToDoListTitleAC,
    removeToDoListAC,
    toDoListsReducer
} from "./todolists-reduser";
import {v1} from "uuid";
import {changeFilterType, todoListsType} from "../App";


test('change title of task',()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<todoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ];
    const endState = toDoListsReducer(startState, removeToDoListAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist';

    const startState: Array<todoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = toDoListsReducer(startState, addToDoListAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('all');
});

test('correct todolist should change its name', ()=> {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<todoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = toDoListsReducer(startState, changeToDoListTitleAC(todolistId2,newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
});
test('correct filter of todolist should be changed', ()=> {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: changeFilterType = 'completed'

    const startState: Array<todoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    const endState = toDoListsReducer(startState, changeToDoListFilterAC(todolistId2,newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
});
