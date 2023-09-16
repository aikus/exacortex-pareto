import {TableCell, TableRow} from "@mui/material";
import Row from "../model/Row";
import EditableCell from "./EditableCell";

export interface DataRowProps {
    row: Row,
    change: (row: Row) => void;
    remove: (row: Row) => void;
}

export default function DataRow(props: DataRowProps) {
    return <TableRow>
        <EditableCell label={"Вариант"} value={props.row.name} autoFocus={true} onChange={(newName) => {
            props.change({...props.row, name: newName});
        }} onRemove={() => props.remove(props.row)}/>
        {
            Object.entries(props.row.words).map(([paramId, value]) => <EditableCell
                key={'word-'+ paramId + props.row.id}
                label={""}
                onChange={(newValue) => {
                    props.change({...props.row, words: {...props.row.words, [paramId] : newValue}})
                }}
                value={value}
                onRemove={null}/>)
        }
        <TableCell></TableCell>
        {
            Object.entries(props.row.rates).map(([paramId, value]) => <EditableCell
                align={"right"}
                key={'rate-'+ paramId + props.row.id}
                label={""}
                onChange={(newValue) => {
                    props.change({...props.row, rates: {...props.row.rates, [paramId] : newValue ? Number(newValue) : null}})
                }}
                value={value ? value.toString() : ""}
                onRemove={null}/>)
        }
        {
            // Object.entries(props.row.squares).map(([paramId, value]) => <TableCell>{value}</TableCell>)
        }
        <TableCell align={"right"}>{null !== props.row.distant ? props.row.distant.toFixed(4) : null}</TableCell>
    </TableRow>
}