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
                    {/* <TableHead>
                        <TableRow>
                            <TableCell>Подразделение</TableCell>
                            <TableCell>Товар</TableCell>
                        </TableRow>
                    </TableHead> */}
                    <TableBody>
                        {data.map(({ division, remainings }) => (
                            <TableRow key={division.id}>
                                <TableCell rowSpan={remainings.length}>
                                    {divisionKind[inverseEnum(divisionKindDTO)[division.kind]] +
                                        " № " +
                                        division.number}
                                </TableCell>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Наименование</TableCell>
                                            <TableCell>Ед. измерения</TableCell>
                                            <TableCell>Остаток</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {remainings.map(remaining => (
                                            <TableRow>
                                                <TableCell>{remaining.product.name}</TableCell>
                                                <TableCell>{remaining.product.unit}</TableCell>
                                                <TableCell>{remaining.quantity}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
