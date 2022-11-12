import React, { useState, useEffect } from "react"

import { Box } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import Header from "./Header"
import Auth from "./Auth"

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
})

export default function Layout({ Component, pageProps }) {
    const [auth, setAuth] = useState(null)

    useEffect(() => {
        setAuth(sessionStorage.getItem("token"))
    })

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {!auth && <Auth />}
            {auth && (
                <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                    <Header />
                    <Box sx={{ flexGrow: 1 }}>
                        <Component {...pageProps} />
                    </Box>
                </Box>
            )}
        </ThemeProvider>
    )
}
