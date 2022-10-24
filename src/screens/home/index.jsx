import React from "react"

import Link from "next/link"

import {
    Container,
    Box,
    TableCell,
    TableRow,
    TableBody,
    Collapse,
    Paper,
    Table,
    TableContainer,
    Button,
    IconButton,
} from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

const plans = [
    {
        id: 0,
        date: 2021,
        purchases: [
            { id: 0, mouth: "январь" },
            { id: 1, mouth: "февраль" },
            { id: 2, mouth: "март" },
        ],
    },
    {
        id: 1,
        date: 2022,
        purchases: [
            { id: 0, mouth: "январь" },
            { id: 1, mouth: "февраль" },
            { id: 2, mouth: "март" },
            { id: 3, mouth: "апрель" },
            { id: 4, mouth: "май" },
            { id: 5, mouth: "июнь" },
        ],
    },
    {
        id: 2,
        date: 2023,
        purchases: [
            { id: 0, mouth: "январь" },
            { id: 1, mouth: "февраль" },
            { id: 2, mouth: "март" },
        ],
    },
    {
        id: 3,
        date: 2024,
        purchases: [
            { id: 0, mouth: "январь" },
            { id: 1, mouth: "февраль" },
            { id: 2, mouth: "март" },
        ],
    },
    {
        id: 4,
        date: 2025,
        purchases: [
            { id: 0, mouth: "январь" },
            { id: 1, mouth: "февраль" },
            { id: 2, mouth: "март" },
            { id: 3, mouth: "апрель" },
            { id: 4, mouth: "май" },
            { id: 5, mouth: "июнь" },
        ],
    },
    {
        id: 5,
        date: 2026,
        purchases: [
            { id: 0, mouth: "январь" },
            { id: 1, mouth: "февраль" },
            { id: 2, mouth: "март" },
        ],
    },
]

export default function Home() {
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
            <TableContainer
                component={Paper}
                sx={{
                    flexGrow: 1,
                    height: 0,
                    boxShadow: 0,
                }}
            >
                <Table aria-label="collapsible table">
                    <TableBody>
                        {plans.map(row => (
                            <Row key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link href="/add-sales-plan" passHref>
                <Button sx={{ mt: 2 }} variant="outlined">
                    Добавить план продаж
                </Button>
            </Link>
        </Container>
    )
}

function Row({ row }) {
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <TableRow
                sx={{
                    "th": { borderBottom: 0 },
                    "& > *": { borderBottom: "unset" },
                }}
            >
                <TableCell sx={{ width: 66, borderBottom: 0 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <Link href="/sales-plan/1" passHref>
                        <Button
                            color="inherit"
                            variant="text"
                            sx={{ textTransform: "none", fontWeight: "bold" }}
                        >
                            План продаж на {row.date} г.
                        </Button>
                    </Link>
                </TableCell>
                <TableCell sx={{ width: 66, borderBottom: 0 }}>
                    <IconButton size="small">
                        <EditIcon />
                    </IconButton>
                </TableCell>
                <TableCell sx={{ width: 66, borderBottom: 0 }}>
                    <IconButton size="small">
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ mb: 2, mx: 15 }}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    {row.purchases.map(({ id, mouth }) => (
                                        <TableRow key={id}>
                                            <TableCell component="th" scope="row">
                                                <Link href="/procurement-plan/1" passHref>
                                                    <Button
                                                        color="inherit"
                                                        variant="text"
                                                        sx={{ textTransform: "none" }}
                                                    >
                                                        План закупок на {mouth}
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                            <TableCell sx={{ width: 66 }}>
                                                <IconButton size="small">
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell sx={{ width: 66 }}>
                                                <IconButton size="small">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Link href="/add-procurement-plan" passHref>
                                <Button
                                    sx={{ my: 2, width: "100%" }}
                                    variant="outlined"
                                    size="small"
                                >
                                    Добавить план закупок
                                </Button>
                            </Link>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
