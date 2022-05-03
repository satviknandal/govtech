import React, { ReactElement } from "react";

interface PageNotFoundProps {
    message: string;
}

const PageNotFoundComponent: React.FC<PageNotFoundProps> = ({ message }): ReactElement => {
    return (
        <div>{message}</div>
    )
};

export default PageNotFoundComponent;
