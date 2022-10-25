import React from "react"

import {
    Container,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from "@mui/material"

export default function Workers({ workers }) {
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
            <Button sx={{ width: 400, mb: 2 }} variant="contained">
                Добавить сотрудника
            </Button>
            <TableContainer component={Paper} sx={{ flexGrow: 1, height: 0 }}>
                <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Фамилия</TableCell>
                            <TableCell>Имя</TableCell>
                            <TableCell>Дата рождения</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workers.map(worker => (
                            <TableRow key={worker.id}>
                                <TableCell>{worker.surname}</TableCell>
                                <TableCell>{worker.name}</TableCell>
                                <TableCell>{worker.birthDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
