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

import { partnerKind, partnerKindDTO } from "@utils/enums"
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
            <TableContainer component={Paper} sx={{ flexGrow: 1, height: 0 }}>
                <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Наименование</TableCell>
                            <TableCell>Тип</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {partners.map(partner => (
                            <TableRow key={partner.id}>
                                <TableCell>{partner.name}</TableCell>
                                <TableCell>
                                    {partnerKind[inverseEnum(partnerKindDTO)[partner.kind]]}
                                </TableCell>
                                <TableCell>
                                    <Link href={`update-partner/${partner.id}`} passHref>
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
            <Button sx={{ width: 400, mt: 2 }} variant="contained">
                Добавить партнера
            </Button>
        </Container>
    )
}
