import { UserType } from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            let copyState = state.map(el => ({ ...el }))
            return copyState.sort((a: UserType, b: UserType) => {
                if (action.payload === 'up') {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            }) // need to fix
        }
        case 'check': {
            let copyState = [...state]
            return copyState.filter(el => el.age > 18) // need to fix
        }
        default:
            return state
    }
}
