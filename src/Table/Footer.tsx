import {ParamsValue} from "../model/ParamsValue";
import {TableCell, TableFooter, TableRow} from "@mui/material";
import {connect} from "react-redux";
import StateInterface from "../data/StateInterface";

interface FooterViewProps {
    maxes: ParamsValue<number | null>
}

function FooterView(props: FooterViewProps) {
    const arr = Object.entries(props.maxes),
        length = arr.length;
    if(length === 0) {
        return <></>;
    }
    return <TableFooter>
        <TableRow>
            <TableCell colSpan={length + 2}>Максимумы</TableCell>
            {
                arr.map(([key, value]) => <TableCell key={"max-" + key} align={"right"}>{value}</TableCell>)
            }
            <TableCell colSpan={length * 2 + 1}></TableCell>
        </TableRow>
    </TableFooter>
}

const Footer = connect((state: StateInterface) => {
    return {
        maxes: state.maxes
    }
})(FooterView);

export default Footer;