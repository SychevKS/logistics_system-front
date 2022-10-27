import React from "react"

import { Box } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import Header from "./Header"

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
})

export default function Layout({ Component, pageProps }) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <Header />
                <Box sx={{ flexGrow: 1 }}>
                    <Component {...pageProps} />
                </Box>
            </Box>
        </ThemeProvider>
    )
}

/* ;<ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header />
        <Box sx={{ flexGrow: 1 }}>
            <Component {...pageProps} />
        </Box>
    </Box>
</ThemeProvider> */
