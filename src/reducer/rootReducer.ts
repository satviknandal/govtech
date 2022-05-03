import { combineReducers } from 'redux';
import { NoteReducer } from './NoteReducer';
import { TableReducer } from './TableReducer';

const rootReducer = combineReducers({
    note: NoteReducer,
    table: TableReducer
})

export default rootReducer;