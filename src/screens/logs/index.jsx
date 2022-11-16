import React from "react"

import {
    Container,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from "@mui/material"

import { useData } from "@hooks"

export default function Logs() {
    const { data } = useData(`${process.env.API_URL}logs`)

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
            <TableContainer component={Paper} sx={{ flexGrow: 1, height: 0 }}>
                <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Дата</TableCell>
                            <TableCell>Действие</TableCell>
                            <TableCell>Пользователь</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map(log => (
                                <TableRow key={log.id}>
                                    <TableCell>{log.date}</TableCell>
                                    <TableCell>{log.message}</TableCell>
                                    <TableCell>{log.userName}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
