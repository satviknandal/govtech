import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import styled from 'styled-components';

const FilterStyle = styled.div`
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
        width: 200px;
      }

      input {
          width: 100%;
          font-size: 16px;
          height: 40px;
          padding: 4px 10px;
      }
`;

interface IFilter {
    setGlobalFilter: (x: string | undefined) => void
}

const Filter: React.FC<IFilter> = ({ setGlobalFilter }) => {
    const [value, setValue] = useState('');

    const onChange = useAsyncDebounce((value: string) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <FilterStyle>
            <label>Search Table: </label>
            <input
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder=" Enter value "
            />
        </FilterStyle>
    );
}

export default Filter; 
