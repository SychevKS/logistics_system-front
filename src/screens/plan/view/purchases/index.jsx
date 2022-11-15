import React from "react"
import { useRouter } from "next/router"

import {
    Container,
    Typography,
    Box,
    TableContainer,
    Table,
    Paper,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material"

import { useData } from "@hooks"
import { month, monthDTO } from "@utils/enums"
import { inverseEnum, getNameDivision } from "@utils/helpers"

export default function PurchasesPlan() {
    const router = useRouter()
    const { id } = router.query

    const plan = useData(id ? `${process.env.API_URL}purchases-plans/${id}` : null)
    const positions = useData(id ? `${process.env.API_URL}purchases-plans/${id}/positions` : null)

    if (plan.isLoading || positions.isLoading) {
        return
    }
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
                    План закупок на {month[inverseEnum(monthDTO)[plan.data.month]]} месяц{" "}
                    {plan.data.planSales.year} года.
                </Typography>
            </Box>

            <TableContainer
                component={Paper}
                sx={{
                    boxShadow: 0,
                    flexGrow: 1,
                    height: 0,
                }}
            >
                {positions.data && (
                    <Table sx={{ minWidth: 650 }} stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Подразделение</TableCell>
                                <TableCell align="left">Наименование</TableCell>
                                <TableCell align="left">Ед. измерения</TableCell>
                                <TableCell align="left">Цель, кол.</TableCell>
                                <TableCell align="left">Выполнение, %</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {positions.data.map(position => (
                                <TableRow key={position.id}>
                                    <TableCell>{getNameDivision(position.division)}</TableCell>
                                    <TableCell>{position.name}</TableCell>
                                    <TableCell>{position.unit.name}</TableCell>
                                    <TableCell>{position.purpose}</TableCell>
                                    <TableCell>
                                        {((position.realization * 100) / position.purpose).toFixed(
                                            1
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </Container>
    )
}
