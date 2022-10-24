import React from "react"

import { Box } from "@mui/material"

import Header from "./Header"

export default function Layout({ Component, pageProps }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Header />
            <Box sx={{ flexGrow: 1 }}>
                <Component {...pageProps} />
            </Box>
        </Box>
    )
}
