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

import { useData } from "@hooks"
import { month, monthDTO } from "@utils/enums"
import { inverseEnum } from "@utils/helpers"

export default function Plans() {
    const { data } = useData(`${process.env.API_URL}sales-plans`)

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
                <Table>
                    <TableBody>
                        {data && data.map(salesPlan => <Row key={salesPlan.id} row={salesPlan} />)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link href="/add-plan-sales" passHref>
                <Button sx={{ mt: 2 }} variant="contained">
                    Добавить план продаж
                </Button>
            </Link>
        </Container>
    )
}

function Row({ row }) {
    const [idSalePlan, setIdSalePlan] = React.useState(null)
    const purchasePlans = useData(
        idSalePlan ? `${process.env.API_URL}sales-plan/${idSalePlan}/purchases-plans` : null
    )

    const onClick = id => () => {
        setIdSalePlan(prev => (!prev ? id : null))
    }

    return (
        <>
            <TableRow
                sx={{
                    "th": { borderBottom: 0 },
                    "& > *": { borderBottom: "unset" },
                }}
            >
                <TableCell sx={{ width: 66, borderBottom: 0 }}>
                    <IconButton aria-label="expand row" size="small" onClick={onClick(row.id)}>
                        {idSalePlan ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell sx={{ borderBottom: 0 }}>
                    <Link href={`plan-sales/${row.id}`} passHref>
                        <Button
                            color="inherit"
                            variant="text"
                            sx={{ textTransform: "none", fontWeight: "bold" }}
                        >
                            План продаж на {row.year} г.
                        </Button>
                    </Link>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={Boolean(purchasePlans.data)} timeout="auto" unmountOnExit>
                        <Box sx={{ mb: 2, mx: 15 }}>
                            <Table size="small" aria-label="purchases">
                                {purchasePlans.data && (
                                    <TableBody>
                                        {purchasePlans.data.map(plan => (
                                            <TableRow key={plan.id}>
                                                <TableCell component="th" scope="row">
                                                    <Link
                                                        href={`plan-purchases/${plan.id}`}
                                                        passHref
                                                    >
                                                        <Button
                                                            color="inherit"
                                                            variant="text"
                                                            sx={{ textTransform: "none" }}
                                                        >
                                                            План закупок на{" "}
                                                            {
                                                                month[
                                                                    inverseEnum(monthDTO)[
                                                                        plan.month
                                                                    ]
                                                                ]
                                                            }
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                )}
                            </Table>
                            <Link href={`/add-plan-purchases/${idSalePlan}`} passHref>
                                <Button
                                    sx={{ my: 2, width: "100%" }}
                                    variant="contained"
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
