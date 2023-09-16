import {TableCell, TableHead, TableRow} from "@mui/material";
import {connect} from "react-redux";
import EditableParamsHead from "./EditableParamsHead";
import ParamsHead from "./ParamsHead";
import StateInterface from "../data/StateInterface";

interface CaptionProps {
    parametersQty: number
}

function CaptionView(props: CaptionProps) {
    const qty = props.parametersQty;
    return <TableHead>
        <TableRow>
            <TableCell rowSpan={2}>Варианты</TableCell>
            <TableCell colSpan={qty + 1}>Параметры словами</TableCell>
            {qty > 0 && <>
                <TableCell colSpan={qty}>Параметры числами</TableCell>
                {/*<TableCell colSpan={qty}>Квадарты проекций</TableCell>*/}
            </>}
            <TableCell rowSpan={2} align={"right"}>Растояние до идеала</TableCell>
        </TableRow>
        <TableRow>
            <EditableParamsHead/>
            <ParamsHead/>
            {/*<ParamsHead/>*/}
        </TableRow>
    </TableHead>;
}

const Caption = connect((state: StateInterface) => {
    return {
        parametersQty: state.params.length
    };
}, () => {return {}})(CaptionView);

export default Caption;