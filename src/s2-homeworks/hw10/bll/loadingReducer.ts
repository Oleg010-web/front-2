const initState = {
    isLoading: false,
}
export type initStateType = {
    isLoading: boolean
}

export const loadingReducer = (state = initState, action: LoadingActionType): initStateType => { // fix any
    switch (action.type) {
        case 'CHANGE_LOADING': {
            let copyState = {...state, isLoading: action.isLoading}
            return copyState
        }

        default:
            return state
    }
}

type LoadingActionType = {
    type: 'CHANGE_LOADING'
    isLoading: boolean
}

export const loadingAC = (isLoading: boolean): LoadingActionType => ({
    type: 'CHANGE_LOADING',
    isLoading,
})
