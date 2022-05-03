export type Action = { type: string, payload: unknown }

export const addNote = (note: string): Action => ({
    type: "ADD_NOTE",
    payload: note
});


export const addRow = (user: any): Action => ({
    type: "ADD_ROW",
    payload: user
});

export const deleteRow = (id: Array<number>): Action => ({
    type: "DELETE_ROW",
    payload: id
});

export const allRecords = (data: any): Action => ({
    type: "ALL_RECORDS",
    payload: data
})
