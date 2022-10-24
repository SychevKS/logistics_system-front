import React from "react"

import {
    Container,
    Typography,
    TableContainer,
    Table,
    Paper,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material"

const rows = [
    {
        name: "undefined",
        amount: "undefined",
    },
    {
        name: "undefined",
        amount: "undefined",
    },
    {
        name: "undefined",
        amount: "undefined",
    },
    {
        name: "undefined",
        amount: "undefined",
    },
    {
        name: "undefined",
        amount: "undefined",
    },
    {
        name: "undefined",
        amount: "undefined",
    },
    {
        name: "undefined",
        amount: "undefined",
    },
    {
        name: "undefined",
        amount: "undefined",
    },
    {
        name: "undefined",
        amount: "undefined",
    },
    {
        name: "undefined",
        amount: "undefined",
    },
    {
        name: "undefined",
        amount: "undefined",
    },
    {
        name: "undefined",
        amount: "undefined",
    },
]

const year = 2022

export default function SalesPlan() {
    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                py: 4,
                alignItems: "stretch",
            }}
        >
            <Typography variant="h5" mb={3}>
                Составление плана продаж на {year} г.
            </Typography>

            <TableContainer
                component={Paper}
                sx={{
                    border: 1,
                    boxShadow: 0,
                    flexGrow: 1,
                    height: 0,
                }}
            >
                <Table sx={{ minWidth: 650 }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Наименование</TableCell>
                            <TableCell align="left" sx={{ width: 200 }}>
                                Количество
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
