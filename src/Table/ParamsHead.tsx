import {connect} from "react-redux";
import Parameter from "../model/Parameter";
import {TableCell} from "@mui/material";
import StateInterface from "../data/StateInterface";

function ParamsHeadView(props: any) {
    return <>
        {props.collection.map((parameter: Parameter) => <TableCell align={"right"}>{parameter.name}</TableCell>) }
    </>
}
const ParamsHead = connect((state: StateInterface) => {
    return {
        collection: state.params
    };
}, (dispatch: any) => {
    return {}
})(ParamsHeadView);

export default ParamsHead;