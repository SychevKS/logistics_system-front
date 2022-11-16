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

import { useData } from "@hooks"
import { checkRoleUser } from "@utils/helpers"

export default function Products() {
    const { data } = useData(`${process.env.API_URL}products`)

    const onSendRemove = id => {
        const data = new URLSearchParams({
            productId: id,
        }).toString()

        fetch(`${process.env.API_URL}products?${data}`, {
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
                            <TableCell>Еденица измерения</TableCell>
                            <TableCell>Цена</TableCell>
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
                            data.map(product => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.unit.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    {checkRoleUser(["Admin"]) && (
                                        <>
                                            <TableCell>
                                                <Link
                                                    href={`update-product/${product.id}`}
                                                    passHref
                                                >
                                                    <IconButton>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => onSendRemove(product.id)}
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
                <Link href={`/add-product`} passHref>
                    <Button sx={{ width: 400, mt: 2 }} variant="contained">
                        Добавить продукт
                    </Button>
                </Link>
            )}
        </Container>
    )
}
