import {IconButton, TableCell, TextField, Typography} from "@mui/material"
import {Cancel} from "@mui/icons-material";
import {useState} from "react";

type onDeleteCallback = () => void;

export interface EditableCellProps {
    label: string
    onChange: (value: string) => void
    value: string | null | undefined
    onRemove: null | undefined | onDeleteCallback
    autoFocus?: boolean,
    align?: "left" | "right"
}

export default function EditableCell(props: EditableCellProps) {
    const [open, setOpen] = useState<boolean>(props.autoFocus || !props.value)
    const [autoFocus, setAutoFocus] = useState<boolean>(!!props.autoFocus)
    return <TableCell
        align={props.align || "left"}
        sx={{
            position: "relative",
            minWidth: "84px",
            minHeight: "74px"
        }}>
        {open ?
            <>&nbsp;<TextField label={props.label} variant={"standard"}
                       autoFocus={autoFocus}
                       onBlur={(event: any) => {
                           props.onChange(event.target.value);
                           if ("" !== event.target.value) {
                               setOpen(false);
                           }
                       }}
                       defaultValue={props.value} sx={{
                width: "95%",
                // position: "absolute",
                // left: 0,
                // bottom: "3px"
            }}/></> : <Typography
                component={"span"}
                sx={{
                    textDecoration: "underline",
                    cursor: "pointer"
                }}
                onClick={() => {
                    setOpen(true)
                    setAutoFocus(true);
                }}>{props.value}</Typography>}
        {props.onRemove ? <IconButton
            sx={{
                position: "absolute",
                top: "3px",
                right: "3px"
            }}
            onClick={() => props.onRemove ? props.onRemove() : null}><Cancel fontSize={"small"}/></IconButton> : <></>}
    </TableCell>
}
