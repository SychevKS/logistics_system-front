import React from "react"
import Link from "next/link"
import Router from "next/router"
import dayjs from "dayjs"

import { Container, Paper, Typography, Box } from "@mui/material"

import { useData } from "@hooks"

export default function Statistics() {
    const { data } = useData(`${process.env.API_URL}statistics`)
    console.log(data)
    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                pt: 4,
                pb: 6,
            }}
        >
            <Paper sx={{ mr: 2, p: 2, mb: 2 }}>
                {data && (
                    <Box>
                        <Typography>Выручка: {data.revenue} руб.</Typography>
                        <Typography>Затраты на доставку: {data.shippingCosts} руб.</Typography>
                        <Typography>Прибыль: {data.profit} руб.</Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    )
}
