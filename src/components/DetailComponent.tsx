import React, { ReactElement, useState } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import useFetchData from "../common/Hooks/UseFetchData";
import { iTableData } from "../interface/Table";

const Styles = styled.div`
    font-family: 'Arial', Helvetica, Sans-serif;
    font-size: 16px;
    width: 100%;
    border-spacing: 0;

    div:nth-child(even) {
        background-color: #f2f2f2;
    }

    div {
      border: 1px solid #ddd;
      display: flex;
      padding: 8px;
      margin: 0;

      :last-child {
        border-right: 0;
      }
    }

    label {
        font-weight: bold;
        width: 20%;
    }  
`;

const DetailComponent = (): ReactElement => {
    const initialIdData: iTableData = {
        avatar: '',
        email: '',
        first_name: '',
        id: 1,
        last_name: ''
    };

    const [idData, setIdData] = useState(initialIdData);
    const params = useParams();
    const url = `https://reqres.in/api/users/${params.id}`;

    useFetchData(
        (res: any) => {
            const { data } = res;
            setIdData(data);
        },
        url
    );

    return (
        <>
            <h1>Details</h1>
            <Styles>
                <div>
                    <label>ID</label>
                    {idData?.id}
                </div>
                <div>
                    <label>First Name</label>
                    {idData?.first_name}
                </div>
                <div>
                    <label>Last Name</label>
                    {idData?.last_name}
                </div>
                <div>
                    <label>Email</label>
                    {idData?.email}
                </div>
                <div>
                    <label>Avatar</label>
                    <img src={idData?.avatar} alt="" />
                </div>
            </Styles>

        </>
    )
};

export default DetailComponent;
