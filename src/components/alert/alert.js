import Alert from "@mui/material/Alert";

function AlertDiv(props) {
    return (
        <Alert onClose={props.action} severity={props.severity}>
            {props.message}
        </Alert>
    );
}

export default AlertDiv;
