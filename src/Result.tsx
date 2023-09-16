import BestResult from "./model/BestResult";
import {Table, TableCell, TableRow, Typography} from "@mui/material";
import Row from "./model/Row";
import {connect} from "react-redux";
import StateInterface from "./data/StateInterface";
import React from "react";

interface ResultViewProps {
    bestResult: BestResult
}

function ResultView(props:ResultViewProps) {
    if(!props.bestResult.recommendation) {
        return <></>;
    }

    return <>
        <Typography
            component={"h2"}
            variant={"h3"}>Результат</Typography>
        <Table>
            <TableRow>
                <TableCell>Рекомендованный вариант</TableCell>
                <TableCell>{ props.bestResult.recommendation.name }</TableCell>
            </TableRow>
            {
                props.bestResult.bests.length < 2 ? <></> :
                    <TableRow>
                        <TableCell>Лучшие результаты</TableCell>
                        <TableCell>
                            {
                                props.bestResult.bests.map<string>((row: Row) => row.name).join(", ")
                            }
                        </TableCell>
                    </TableRow>
            }
        </Table>
    </>;
}

const Result = connect((state: StateInterface) => {
    return {
        bestResult: state.bestResult
    }
})(ResultView);

export default Result;