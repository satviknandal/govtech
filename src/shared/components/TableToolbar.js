import React from 'react'

import AddDialog from '../../components/table/AddDailog';
import Filter from './Filter';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ToolbarStyle = styled.div`
    font-family: 'Arial', Helvetica, Sans-serif;
    background: #fff;
    border: 0;
    display: flex;
    margin-bottom: 20px;

    div {
      width: 50%;    
    }
    div:last-child {
      text-align: right
    }

    .add {
      width: 50%;
      display: flex;

      button {
        width: 70px;
        height: 70px;
        margin-right: 10px
      }

      span {
        padding-top: 25px
      }
    }

    .search {

    }
    
    .deleteBtn {
      width: 50%;
      button {
        float: right;
        height: 40px;
        padding: 4px 10px;
        margin-top: 12px;
        margin-right: 16px;
      }
    }
`;

const TableToolbar = props => {
  const {
    numSelected,
    addUserHandler,
    deleteUserHandler,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
  } = props;
  return (
    <ToolbarStyle>
      <div className='add'>
        <AddDialog addUserHandler={addUserHandler} />
        {numSelected > 0 ? (
          <span>
            {numSelected} selected
          </span>
        ) : (
          <span>Users</span>
        )}
      </div>

      {numSelected > 0 ? (
        <div className="deleteBtn">
          <button type="button" aria-label="delete" onClick={deleteUserHandler}>
            Delete
          </button>
        </div>
      ) : (
        <Filter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )
      }
    </ToolbarStyle >
  )
}

TableToolbar.propTypes = {
  numSelected: PropTypes.number,
  addUserHandler: PropTypes.func,
  deleteUserHandler: PropTypes.func,
  setGlobalFilter: PropTypes.func,
  preGlobalFilteredRows: PropTypes.array,
  globalFilter: PropTypes.string,
}

export default TableToolbar
