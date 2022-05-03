import React, { ReactElement } from "react";
import styled from "styled-components";

const HeadingStyle = styled.h1`
    font-family: 'Arial', Helvetica, Sans-serif;
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
`;

interface IHeadingProps {
    title: string
}

const Heading: React.FC<IHeadingProps> = ({ title }): ReactElement => {
    return <HeadingStyle>{title}</HeadingStyle>;
};

export default Heading;