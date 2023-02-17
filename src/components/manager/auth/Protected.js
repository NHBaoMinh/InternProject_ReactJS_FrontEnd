import { Outlet, Navigate } from "react-router-dom";

const Protected = (props) => {
    console.log(props.acceptable);
    if (props.acceptable === false) {
        return <Navigate to="/" replace={true} />;
    } else {
        return props.children;
    }
};
export default Protected;
