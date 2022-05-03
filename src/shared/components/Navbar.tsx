import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { NavItem } from "../../interface/Nav";
import styled from 'styled-components';

const Styles = styled.div`
  nav {
    background-color: #d03530;
    padding: 4px 0;
    border-radius: 8px;
    margin-bottom: 20px;
    color: #fff;
    box-shadow: 0 15px 20px -10px rgb(52 52 52 / 10%);

    ul {
        display: flex;
        list-style-type: none;
        li {
            padding: 4px 15px;
            font-size: 16px;
            font-family: 'Arial', Helvetica, Sans-serif;
            font-weight: bold;
            text-transform: uppercase;
            border-right: 1px solid #fff;

            a {
                text-decoration: none;
                color: #fff;
            }

            &:first-child {
                padding-left: 0;
            }
            
            &:last-child {
                border: 0px;
            }
        }
    }
  }
`;

interface NavInputProps {
    data: NavItem[];
}

const Navbar: React.FC<NavInputProps> = ({ data }): ReactElement => {
    return (
        <Styles>
            <nav>
                <ul>
                    {data && data.map(({ label, link }: NavItem) => {
                        return <li key={label}><Link to={link}>{label}</Link></li>;
                    })
                    }
                </ul>
            </nav>
        </Styles>
    )
};

export default Navbar;
