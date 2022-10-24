import React from "react"

import { v4 } from "uuid"

import {
    Container,
    Typography,
    TextField,
    Box,
    TableContainer,
    Table,
    Paper,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from "@mui/material"

import { DateInput, SelectProduct, SelectDivision } from "@components"

const nomenclature = [
    { name: "Свиной хвост" },
    { name: "Грудка свиньи" },
    { name: "Свиньи копыта" },
]

const initialRow = {
    name: undefined,
    amount: undefined,
    division: undefined,
}

export default function ProcurementPlan() {
    const rows = [
        {
            name: "undefined",
            amount: "undefined",
            division: "undefined",
        },
        {
            name: "undefined",
            amount: "undefined",
            division: "undefined",
        },
        {
            name: "undefined",
            amount: "undefined",
            division: "undefined",
        },
        {
            name: "undefined",
            amount: "undefined",
            division: "undefined",
        },
    ]

    const month = "сентябрь"

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
            <Box display="flex" alignItems="center" mb={3}>
                <Typography variant="h5" sx={{ mr: 1 }}>
                    План закупок на {month} месяц.
                </Typography>
            </Box>

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
                            <TableCell align="left" width={400}>
                                Наименование
                            </TableCell>
                            <TableCell align="left" width={100}>
                                Количество
                            </TableCell>
                            <TableCell align="left">Подразделение</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.key}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{row.division}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
