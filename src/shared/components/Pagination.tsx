import React from 'react';
import styled from 'styled-components';

const PaginationStyle = styled.div`
    font-family: 'Arial', Helvetica, Sans-serif;
    background: #fff;
    border: 0;
    text-align: center;
    display: flex;
    margin-bottom: 20px;
      
      label {
        font-size: 20px;
        font-weight: bold;
        padding: 12px 0 0 0;
        margin-right: 16px;
      }

      input {
          max-width: 300px;
          width: 100%;
          font-size: 16px;
          height: 40px;
          padding: 4px 10px;
      }
`;

interface IPagination {
    pageIndex: number,
    pageOptions: Array<number>,
    pageCount: number,
    canPreviousPage: boolean,
    canNextPage: boolean,
    gotoPage: (x: number) => void,
    previousPage: () => void,
    nextPage: () => void
}

const Pagination: React.FC<IPagination> = ({ pageIndex, pageOptions, pageCount, canPreviousPage, canNextPage, gotoPage, previousPage, nextPage }) => (
    <PaginationStyle>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
        </button>{' '}
        <span>
            Page{' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
        </span>
    </PaginationStyle>
);

export default Pagination; 
