import React from "react"
import Link from "next/link"

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
    IconButton,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"

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
            <TableContainer component={Paper} sx={{ flexGrow: 1, height: 0 }}>
                <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Фамилия</TableCell>
                            <TableCell>Имя</TableCell>
                            <TableCell>Дата рождения</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workers.map(worker => (
                            <TableRow key={worker.id}>
                                <TableCell>{worker.surname}</TableCell>
                                <TableCell>{worker.name}</TableCell>
                                <TableCell>{worker.birthDate}</TableCell>
                                <TableCell>
                                    <Link href={`update-worker/${worker.id}`} passHref>
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link href={`/add-worker`} passHref>
                <Button sx={{ width: 400, mt: 2 }} variant="contained">
                    Добавить сотрудника
                </Button>
            </Link>
        </Container>
    )
}
