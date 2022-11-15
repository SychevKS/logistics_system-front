import React from "react"
import Link from "next/link"
import Router from "next/router"
import dayjs from "dayjs"

import {
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Table,
    TableContainer,
    Paper,
    Button,
    IconButton,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

import { divisionKind, divisionKindDTO } from "@utils/enums"
import { inverseEnum } from "@utils/helpers"

export default function List({ invoices, columns, url }) {
    const onSendRemove = id => {
        const data = new URLSearchParams({
            invoiceId: id,
        }).toString()

        fetch(`${process.env.API_URL}invoices?${data}`, {
            method: "delete",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        }).then(() => Router.reload())
    }

    return (
        <TableContainer component={Paper} sx={{ flexGrow: 1, height: 0 }}>
            <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Дата</TableCell>
                        <TableCell>Номер</TableCell>
                        <TableCell>Сотрудник</TableCell>
                        {columns.map((item, index) => (
                            <TableCell key={index}>{item}</TableCell>
                        ))}
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices.map(invoice => (
                        <TableRow key={invoice.invoiceId}>
                            <TableCell>{dayjs(invoice.date).format("DD.MM.YYYY HH:mm")}</TableCell>
                            <TableCell>
                                <Link href={url + invoice.invoiceId} passHref>
                                    <Button size="small" variant="text">
                                        {invoice.number}
                                    </Button>
                                </Link>
                            </TableCell>
                            <TableCell>
                                {invoice.worker.surname + " " + invoice.worker.name}
                            </TableCell>
                            {invoice.division && (
                                <TableCell>
                                    {divisionKind[
                                        inverseEnum(divisionKindDTO)[invoice.division.kind]
                                    ] +
                                        " № " +
                                        invoice.division.number}
                                </TableCell>
                            )}
                            {invoice.partner && <TableCell>{invoice.partner.name}</TableCell>}
                            {invoice.inDivision && (
                                <TableCell>
                                    {divisionKind[
                                        inverseEnum(divisionKindDTO)[invoice.outDivision.kind]
                                    ] +
                                        " № " +
                                        invoice.outDivision.number}
                                </TableCell>
                            )}
                            {invoice.outDivision && (
                                <TableCell>
                                    {divisionKind[
                                        inverseEnum(divisionKindDTO)[invoice.inDivision.kind]
                                    ] +
                                        " № " +
                                        invoice.inDivision.number}
                                </TableCell>
                            )}
                            <TableCell>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => onSendRemove(invoice.invoiceId)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
