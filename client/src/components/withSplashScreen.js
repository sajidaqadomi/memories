import React from "react";

export default (WrappedComponent) => {
    return (newComponent = (props) => {
        return <WrappedComponent {...props} />;
    });
};
