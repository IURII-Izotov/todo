import {appReducer, InitialAppStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    };
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC('someError'))
    expect(endState.error).toBe('someError');
});
test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppStatusAC('loading'))
    expect(endState.status).toBe('loading')
});
