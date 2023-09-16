import React from 'react';
import {AppBar, Container, Typography} from "@mui/material";
import MainTable from "./Table/MainTable";
import Result from "./Result";

function App() {
    return (
        <>
            <AppBar position={"static"}>
                <Typography
                    component={"h1"}
                    variant={"h6"}
                    color="inherit"
                    noWrap>Decide!</Typography>
            </AppBar>
            <Container>
                <MainTable/>
                <Result/>
            </Container>
        </>
    );
}

export default App;
