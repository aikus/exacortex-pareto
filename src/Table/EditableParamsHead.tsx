import {connect} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {addParameter, removeParameter, setParameter} from "../data/table";
import Parameter from "../model/Parameter";
import EditableCell from "./EditableCell";
import {IconButton, TableCell} from "@mui/material";
import {Add} from "@mui/icons-material";
import generator from "../model/generator";
import StateInterface from "../data/StateInterface";
import {Dispatch} from "redux";

function EditableParamsHeadView(props: any) {
    return <>
        {
            props.collection.map((parameter: Parameter) => <EditableCell
                autoFocus={true}
                label={"Параметр"}
                value={parameter.name}
                onChange={(newName: string) => props.setParameter({
                    id: parameter.id,
                    name: newName
                })}
                onRemove={() => props.removeParameter(parameter)}
            />)
        }
        <TableCell><IconButton onClick={function (event: any) {
            props.addParameter({
                id: generator(),
                name: ""
            });
        }}><Add/></IconButton></TableCell>
    </>
}

const EditableParamsHead = connect((state: StateInterface) => {
    return {
        collection: state.params
    };
}, (dispatch: Dispatch) => {
    return {
        addParameter: bindActionCreators(addParameter, dispatch),
        setParameter: bindActionCreators(setParameter, dispatch),
        removeParameter: bindActionCreators(removeParameter, dispatch),
    }
})(EditableParamsHeadView);

export default EditableParamsHead;