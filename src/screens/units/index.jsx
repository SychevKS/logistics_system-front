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

export default function Units({ units }) {
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
                Добавить еденицу измерения
            </Button>
            <TableContainer component={Paper} sx={{ flexGrow: 1, height: 0 }}>
                <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Наименование</TableCell>
                        </TableRow>
                        <TableCell></TableCell>
                    </TableHead>
                    <TableBody>
                        {units.map(unit => (
                            <TableRow key={unit.id}>
                                <TableCell>{unit.name}</TableCell>
                                <TableCell>
                                    <Link href={`update-unit/${unit.id}`} passHref>
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
        </Container>
    )
}
