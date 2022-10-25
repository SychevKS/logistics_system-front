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

import { PartnerKind, PartnerKindDTO } from "@utils/enums"
import { inverseEnum } from "@utils/helpers"

export default function Partners({ partners }) {
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
                Добавить партнера
            </Button>
            <TableContainer component={Paper} sx={{ flexGrow: 1, height: 0 }}>
                <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Наименование</TableCell>
                            <TableCell>Тип</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {partners.map(partner => (
                            <TableRow key={partner.id}>
                                <TableCell>{partner.name}</TableCell>
                                <TableCell>
                                    {PartnerKind[inverseEnum(PartnerKindDTO)[partner.kind]]}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
