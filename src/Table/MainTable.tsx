import {Table, TableContainer, Typography} from "@mui/material";
import Caption from "./Caption";
import Body from "./Body";
import Footer from "./Footer";
import React from "react";

export default function MainTable() {
    return <TableContainer>
            <Typography
                component={"h2"}
                variant={"h3"}>Данные</Typography>
            <Table>
                <Caption/>
                <Body/>
                <Footer/>
            </Table>
    </TableContainer>
}