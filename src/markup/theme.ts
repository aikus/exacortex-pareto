import {createTheme} from "@mui/material";
import {blue} from "@mui/material/colors";

const theme = createTheme({
    spacing: 8,
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: blue[300],

                }
            }
        }
    }
});

export default theme;