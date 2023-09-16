import {connect} from "react-redux";
import {IconButton, TableBody, TableCell, TableRow} from "@mui/material";
import {Add} from "@mui/icons-material";
import StateInterface from "../data/StateInterface";
import {Dispatch} from "redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {addRow, removeRow, setRow} from "../data/table";
import RowHelper from "../model/RowHelper";
import Row from "../model/Row";
import DataRow from "./DataRow";

function BodyView(props: any) {
    return <TableBody>
        {
            props.rows.map((row: Row) => <DataRow row={row} change={props.setRow} remove={props.removeRow}/>)
        }
        <TableRow>
            <TableCell colSpan={props.parametersQty * 3 + 3}><IconButton onClick={() => props.addRow(RowHelper.createNewRow(""))}><Add/></IconButton></TableCell>
        </TableRow>
    </TableBody>
}

const Body = connect((state: StateInterface) =>  {
    return {
        parametersQty: state.params.length,
        rows: state.rows
    };
}, (dispatch: Dispatch) => {
    return {
        addRow: bindActionCreators(addRow, dispatch),
        setRow: bindActionCreators(setRow, dispatch),
        removeRow: bindActionCreators(removeRow, dispatch)
    };
})(BodyView);

export default Body;