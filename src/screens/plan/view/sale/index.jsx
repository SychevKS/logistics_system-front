import React from "react"
import { useRouter } from "next/router"

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

import { useData } from "@hooks"

export default function SalesPlan() {
    const router = useRouter()
    const { id } = router.query
    const plan = useData(id ? `${process.env.API_URL}sales-plan/${id}` : null)
    const positions = useData(id ? `${process.env.API_URL}sales-plan/${id}/positions` : null)
    console.log(positions)
    if (plan.isLoading) {
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
            <Typography variant="h5" mb={3}>
                План продаж на {plan.data.year} год.
            </Typography>

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
                                <TableCell align="left">Наименование</TableCell>
                                <TableCell align="left" sx={{ width: 200 }}>
                                    Количество
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {positions.data.map(position => (
                                <TableRow key={position.id}>
                                    <TableCell>{position.product.name}</TableCell>
                                    <TableCell>{position.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </Container>
    )
}
