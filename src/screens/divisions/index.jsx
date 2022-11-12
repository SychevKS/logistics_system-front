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

import { divisionKind, divisionKindDTO } from "@utils/enums"
import { inverseEnum } from "@utils/helpers"
import { useData } from "@hooks"

export default function Divisions() {
    const { data } = useData(`${process.env.API_URL}divisions`)

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
                            <TableCell>Тип</TableCell>
                            <TableCell>Номер</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    {data && (
                        <TableBody>
                            {data.map(division => (
                                <TableRow key={division.id}>
                                    <TableCell>
                                        {divisionKind[inverseEnum(divisionKindDTO)[division.kind]]}
                                    </TableCell>
                                    <TableCell>{division.number}</TableCell>
                                    <TableCell>
                                        <Link href={`update-division/${division.id}`} passHref>
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
            <Link href={`/add-division`} passHref>
                <Button sx={{ width: 400, mt: 2 }} variant="contained">
                    Добавить подразделение
                </Button>
            </Link>
        </Container>
    )
}
