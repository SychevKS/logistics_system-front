import React from "react"
import Link from "next/link"
import Router from "next/router"

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
import DeleteIcon from "@mui/icons-material/Delete"

import { partnerKind, partnerKindDTO } from "@utils/enums"
import { inverseEnum } from "@utils/helpers"
import { useData } from "@hooks"

export default function Partners() {
    const { data } = useData(`${process.env.API_URL}partners`)

    const onSendRemove = id => {
        const data = new URLSearchParams({
            partnerId: id,
        }).toString()

        fetch(`${process.env.API_URL}partners?${data}`, {
            method: "delete",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        }).then(() => Router.reload())
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
                            <TableCell>Наименование</TableCell>
                            <TableCell>Тип</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map(partner => (
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
                                    <TableCell>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => onSendRemove(partner.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link href={"/add-partner"} passHref>
                <Button sx={{ width: 400, mt: 2 }} variant="contained">
                    Добавить партнера
                </Button>
            </Link>
        </Container>
    )
}
