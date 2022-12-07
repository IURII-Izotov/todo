import {TasksStateType} from '../../app/App';
import {addTodolistAC, ToDoListDomainType, todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<ToDoListDomainType> = [];

    const action = addTodolistAC({
        order:0,
        title:'212433213',
        addedDate:'',
        id:'22'
    });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});
