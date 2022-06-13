import {userReducer} from "./user-reduser";
import {StateType} from './user-reduser';

test('user reducer should increment only age', () => {
    const startState: StateType = {age: 20, childrenCount: 2, name: 'Dimych'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}
    const endState = userReducer(startState,{type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(3);
})


test('user reducer should change name',()=>{
    const startState= {age: 20, childrenCount: 2, name: 'Dimych'}
    const newName ="Hero"
    const endState = userReducer(startState,{type:'CHANGE-NAME',newName})

    expect(endState.name).toBe("Hero")
})
