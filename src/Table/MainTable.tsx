import {Table, Typography} from "@mui/material";
import Caption from "./Caption";
import Body from "./Body";
import Footer from "./Footer";
import React from "react";
import PartContainer from "../markup/PartContainer";

export default function MainTable() {
    return <PartContainer>
            <Typography
                component={"h2"}
                variant={"h3"}>Данные</Typography>
            <Table>
                <Caption/>
                <Body/>
                <Footer/>
            </Table>
    </PartContainer>
}