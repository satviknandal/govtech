import { Action } from "../actions/tableActions";

export interface TableState {
    table: any
}

const initialState = {
    table: []
}

export const TableReducer = (state: TableState = initialState, action: Action) => {
    switch (action.type) {
        case "ALL_RECORDS": {
            return { ...state, table: action.payload }
        }
        case "ADD_ROW": {
            return { ...state, table: [...state.table, action.payload] }
        }
        case "DELETE_ROW": {
            const items: any = action.payload;
            const array3 = state.table.filter(function (obj: any) {
                return items.indexOf(obj.id) == -1;
            });
            return { ...state, table: array3 }
        }
        default:
            return state
    }
}
