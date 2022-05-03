import React from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import styled from 'styled-components';
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableToolbar from "./TableToolbar";

const TableStyle = styled.table`
    font-family: 'Arial', Helvetica, Sans-serif;
    font-size: 16px;
    width: 100%;
    border-spacing: 0;
    margin-bottom:20px;

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    tr:hover {
        background-color: #ddd;
    }

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      margin: 0;

      :last-child {
        border-right: 0;
      }

      img {
          max-width: 130px
      }
    }

    th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #04AA6D;
        color: white;
        font-weight: bold;
    }

    td {
        a {
            color: red;
        }
    }
  
`;

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }: any, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef: any = ref || defaultRef

        useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)

// Create an editable cell renderer
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
    editableRowIndex // index of the row we requested for editing
}: any) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])
    return index === editableRowIndex ? (
        <input value={value} onChange={onChange} onBlur={onBlur} />
    ) : (
        <p>{value}</p>
    );
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
}


const Table = ({ columns, data, updateMyData, skipPageReset, onDelete, onAddUser, onDeleteUser }: any) => {
    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const navigate = useNavigate();
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        selectedFlatRows,
        state: { pageIndex, selectedRowIds, globalFilter }
    }: any = useTable(
        {
            columns,
            data,
            defaultColumn,
            autoResetPage: !skipPageReset,
            updateMyData,
            // skipPageReset
            // pass state variables so that we can access them in edit hook later
            editableRowIndex,
            setEditableRowIndex // setState hook for toggling edit on/off switch
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
                {
                    accessor: "edit",
                    id: "edit",
                    Header: "edit",
                    Cell: ({ row, setEditableRowIndex, editableRowIndex }) => (
                        <>
                            <button
                                className="action-button"
                                onClick={() => {
                                    const currentIndex = row.index;
                                    if (editableRowIndex !== currentIndex) {
                                        setEditableRowIndex(currentIndex);
                                    } else {
                                        setEditableRowIndex(null);
                                    }
                                }}
                            >
                                {editableRowIndex !== row.index ? "Edit" : "Save"}
                            </button>
                            <button value="test" onClick={() => navigate(`/table/${row.values.id}`)}>
                                View
                            </button>
                            <button value={'row'} onClick={() => onDelete(row.values)}>
                                Delete
                            </button>
                        </>
                    )
                }
            ])
        }
    );


    const deleteUserHandler = () => {
        const iDs: Array<number> = [];
        selectedFlatRows.map((obj: any, value: any) => iDs.push(Number(obj.values.id)));
        onDeleteUser(iDs);
        //api implementation and store updation pending
    };

    const addUserHandler = (user: any) => {
        onAddUser(user);
    };

    return (
        <>
            <TableToolbar
                numSelected={Object.keys(selectedRowIds).length}
                deleteUserHandler={deleteUserHandler}
                addUserHandler={addUserHandler}
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={globalFilter}
            />
            <TableStyle {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row: any) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell: any) => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </TableStyle>
            <Pagination
                pageIndex={pageIndex}
                pageOptions={pageOptions}
                pageCount={pageCount}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                gotoPage={gotoPage}
                nextPage={nextPage}
                previousPage={previousPage}

            ></Pagination>
        </>
    );
}

export default Table;