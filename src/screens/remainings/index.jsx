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

import { divisionKind, divisionKindDTO } from "@utils/enums"
import { inverseEnum } from "@utils/helpers"
import { useData } from "@hooks"

export default function Remainings() {
    const { data, isLoading } = useData(`${process.env.API_URL}remainings`)

    if (isLoading) {
        return
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
            <TableContainer component={Paper} sx={{ flexGrow: 1, height: 0 }}>
                <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Подразделение</TableCell>
                            <TableCell align="center">Наименование</TableCell>
                            <TableCell align="center">Ед. измерения</TableCell>
                            <TableCell align="center">Остаток</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(({ division, remainings }) => (
                            <TableRow key={division.id}>
                                <TableCell align="center" rowSpan={remainings.length}>
                                    {divisionKind[inverseEnum(divisionKindDTO)[division.kind]] +
                                        " № " +
                                        division.number}
                                </TableCell>
                                <TableCell colSpan={3}>
                                    <Table size="small">
                                        <TableBody>
                                            {remainings.map(remaining => (
                                                <TableRow key={remaining.id}>
                                                    <TableCell>{remaining.product.name}</TableCell>
                                                    <TableCell>
                                                        {remaining.product.unit.name}
                                                    </TableCell>
                                                    <TableCell>{remaining.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
