import { useSelector, useDispatch } from "react-redux";
import { TableState } from "../../reducer/TableReducer";
import { addRow, allRecords, deleteRow } from "../../actions/tableActions";
import Table from "../../shared/components/Table";
import useFetchData from "../../common/Hooks/UseFetchData";
import { iTable, iTableData } from "../../interface/Table";
import React, { useState } from "react";

const TableComponent = () => {
  const dispatch = useDispatch();
  const [skipPageReset, setSkipPageReset] = useState(false);
  const url = "https://reqres.in/api/users?per_page=100";

  useFetchData(
    (res: iTable) => {
      dispatch(allRecords(res.data));
    },
    url
  );

  const tableFetchData = useSelector<TableState, TableState["table"]>((state) => state.table);

  const onDelete = (x: iTableData) => {
    dispatch(deleteRow([x.id]));
    // api implementation pending
  }

  const onAddUser = (x: any) => {
    dispatch(addRow(x));
    // api implementation pending
  }

  const onDeleteUser = (x: any) => {
    dispatch(deleteRow(x));
    // api implementation pending
  }



  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "First Name",
      accessor: "first_name"
    },
    {
      Header: "Last Name",
      accessor: "last_name",
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: ({ cell, value }: any) => {
        return (cell ? <a href={`mailto:${value}}`}>{value}</a> : "-")
      }
    },
    {
      Header: "Image",
      accessor: "avatar",
      disableSortBy: true,
      Cell: ({ cell, value }: any) => {
        return (cell ? <img src={value} alt="" /> : "-")
      }
    },
  ];

  const updateMyData = (rowIndex: any, columnId: any, value: any) => {
    setSkipPageReset(true);
    console.log("updateMyData Home Page", rowIndex, columnId, value);
    //api call implementation is pending
  }

  return (
    tableFetchData && tableFetchData.table.length &&
    <Table
      columns={columns}
      data={tableFetchData.table}
      updateMyData={updateMyData}
      onAddUser={onAddUser}
      onDeleteUser={onDeleteUser}
      skipPageReset={skipPageReset}
      onDelete={onDelete}
    ></Table>
  );
}

export default TableComponent;

