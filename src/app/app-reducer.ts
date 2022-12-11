export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null | undefined

export type InitialStateType = {
    status:RequestStatusType
    error:ErrorType
}
const initialState:InitialStateType = {
    status: 'idle',
    error: null
}
export type SetErrorType = ReturnType<typeof setAppErrorAC>;
export type SetStatusType = ReturnType<typeof setAppStatusAC>;
type ActionTypes=
    SetErrorType
    |SetStatusType
export type InitialAppStateType = typeof initialState


export const appReducer = (state: InitialAppStateType = initialState, action: ActionTypes): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}


export const setAppErrorAC = (error:ErrorType)=>({
    type:'APP/SET-ERROR',
    error
}  as const)

export const setAppStatusAC = (status:RequestStatusType)=>({
    type:'APP/SET-STATUS',
    status
}  as const)
