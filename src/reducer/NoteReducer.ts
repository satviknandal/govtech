import { Action } from "../actions/tableActions";

export interface NotesState {
    notes: string[]
}

const initialState = {
    notes: []
}

export const NoteReducer = (state: NotesState = initialState, action: Action) => {
    switch (action.type) {
        case "ADD_NOTE": {
            return { ...state, notes: [...state.notes, action.payload] }
        }
        default:
            return state
    }
}