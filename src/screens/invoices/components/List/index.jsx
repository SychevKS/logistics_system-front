import React from "react"
import Link from "next/link"

import {
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Table,
    TableContainer,
    Paper,
    Button,
} from "@mui/material"

import { DivisionKind, DivisionKindDTO } from "@utils/enums"
import { inverseEnum } from "@utils/helpers"

export default function List({ invoices, columns, url }) {
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices.map(invoice => (
                        <TableRow key={invoice.invoiceId}>
                            <TableCell>{invoice.date}</TableCell>
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
                                    {DivisionKind[
                                        inverseEnum(DivisionKindDTO)[invoice.division.kind]
                                    ] +
                                        " № " +
                                        invoice.division.number}
                                </TableCell>
                            )}
                            {invoice.partner && <TableCell>{invoice.partner.name}</TableCell>}
                            {invoice.inDivision && (
                                <TableCell>
                                    {DivisionKind[
                                        inverseEnum(DivisionKindDTO)[invoice.inDivision.kind]
                                    ] +
                                        " № " +
                                        invoice.inDivision.number}
                                </TableCell>
                            )}
                            {invoice.outDivision && (
                                <TableCell>
                                    {DivisionKind[
                                        inverseEnum(DivisionKindDTO)[invoice.outDivision.kind]
                                    ] +
                                        " № " +
                                        invoice.outDivision.number}
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}