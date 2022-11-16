import React from "react"
import Link from "next/link"
import Router from "next/router"

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

import { useData } from "@hooks"
import { month, monthDTO } from "@utils/enums"
import { inverseEnum, checkRoleUser } from "@utils/helpers"

export default function Plans() {
    const [planSalesId, setPlanSalesId] = React.useState(null)

    const salesPlans = useData(`${process.env.API_URL}sales-plans`)
    const purchasesPlans = useData(
        planSalesId ? `${process.env.API_URL}sales-plan/${planSalesId}/purchases-plans` : null
    )

    const onClick = id => () => {
        setPlanSalesId(prev => (!prev ? id : null))
    }

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
                        {salesPlans.data &&
                            salesPlans.data.map(salesPlan => (
                                <React.Fragment key={salesPlan.id}>
                                    <RowPlanSale
                                        planSalesId={planSalesId}
                                        plan={salesPlan}
                                        onClick={onClick}
                                    />
                                    <RowPlanPurchases
                                        planSalesId={planSalesId}
                                        plans={purchasesPlans.data}
                                    />
                                </React.Fragment>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {checkRoleUser(["Admin"]) && (
                <Link href="/add-plan-sales" passHref>
                    <Button sx={{ mt: 2 }} variant="contained">
                        Добавить план продаж
                    </Button>
                </Link>
            )}
        </Container>
    )
}

function RowPlanSale({ planSalesId, plan, onClick }) {
    const onSendRemove = id => {
        const data = new URLSearchParams({
            planId: id,
        }).toString()

        fetch(`${process.env.API_URL}sales-plans?${data}`, {
            method: "delete",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        }).then(() => Router.reload())
    }
    return (
        <TableRow
            sx={{
                "th": { borderBottom: 0 },
                "& > *": { borderBottom: "unset" },
            }}
        >
            <TableCell sx={{ width: 66, borderBottom: 0 }}>
                <IconButton aria-label="expand row" size="small" onClick={onClick(plan.id)}>
                    {planSalesId ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell sx={{ borderBottom: 0 }}>
                <Link href={`plan-sales/${plan.id}`} passHref>
                    <Button
                        color="inherit"
                        variant="text"
                        sx={{ textTransform: "none", fontWeight: "bold" }}
                    >
                        План продаж на {plan.year} г.
                    </Button>
                </Link>
            </TableCell>
            {checkRoleUser(["Admin"]) && (
                <TableCell component="th" scope="row">
                    <IconButton aria-label="delete" onClick={() => onSendRemove(plan.id)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            )}
        </TableRow>
    )
}

function RowPlanPurchases({ planSalesId, plans }) {
    const onSendRemove = id => {
        const data = new URLSearchParams({
            planId: id,
        }).toString()

        fetch(`${process.env.API_URL}purchases-plans?${data}`, {
            method: "delete",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        }).then(() => Router.reload())
    }

    return (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={Boolean(plans)} timeout="auto" unmountOnExit>
                    <Box sx={{ mb: 2, mx: 15 }}>
                        <Table size="small" aria-label="purchases">
                            <TableBody>
                                {plans &&
                                    plans.map(plan => (
                                        <TableRow key={plan.id}>
                                            <TableCell component="th" scope="row">
                                                <Link href={`plan-purchases/${plan.id}`} passHref>
                                                    <Button
                                                        color="inherit"
                                                        variant="text"
                                                        sx={{ textTransform: "none" }}
                                                    >
                                                        План закупок на{" "}
                                                        {month[inverseEnum(monthDTO)[plan.month]]}
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                            {checkRoleUser(["Admin"]) && (
                                                <TableCell component="th" scope="row">
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => onSendRemove(plan.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        {checkRoleUser(["Admin"]) && (
                            <Link href={`/add-plan-purchases/${planSalesId}`} passHref>
                                <Button
                                    sx={{ my: 2, width: "100%" }}
                                    variant="contained"
                                    size="small"
                                >
                                    Добавить план закупок
                                </Button>
                            </Link>
                        )}
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}
