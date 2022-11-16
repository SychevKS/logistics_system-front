import React from "react"
import Link from "next/link"
import Router from "next/router"
import dayjs from "dayjs"

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

import { useData } from "@hooks"
import { checkRoleUser } from "@utils/helpers"

export default function Workers() {
    const { data } = useData(`${process.env.API_URL}workers`)

    const onSendRemove = id => {
        const data = new URLSearchParams({
            workerId: id,
        }).toString()

        fetch(`${process.env.API_URL}workers?${data}`, {
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
                            <TableCell>Фамилия</TableCell>
                            <TableCell>Имя</TableCell>
                            <TableCell>Дата рождения</TableCell>
                            {checkRoleUser(["Admin"]) && (
                                <>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map(worker => (
                                <TableRow key={worker.id}>
                                    <TableCell>{worker.surname}</TableCell>
                                    <TableCell>{worker.name}</TableCell>
                                    <TableCell>
                                        {dayjs(worker.birthDate).format("DD.MM.YYYY")}
                                    </TableCell>
                                    {checkRoleUser(["Admin"]) && (
                                        <>
                                            <TableCell>
                                                <Link href={`update-worker/${worker.id}`} passHref>
                                                    <IconButton>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => onSendRemove(worker.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {checkRoleUser(["Admin"]) && (
                <Link href={`/add-worker`} passHref>
                    <Button sx={{ width: 400, mt: 2 }} variant="contained">
                        Добавить сотрудника
                    </Button>
                </Link>
            )}
        </Container>
    )
}
