import React from "react"

import {
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Table as TableBase,
    TableContainer,
    Paper,
} from "@mui/material"

import { useData } from "@hooks"

export default function Table({ invoiceId }) {
    const { data, isLoading } = useData(`${process.env.API_URL}invoice/${invoiceId}/positions`)

    if (isLoading) {
        return false
    }

    return (
        <TableContainer
            component={Paper}
            sx={{
                flexGrow: 1,
                height: 0,
            }}
        >
            <TableBase
                sx={{
                    minWidth: 650,
                }}
                size="small"
                stickyHeader
            >
                <TableHead>
                    <TableRow>
                        <TableCell>№ пп</TableCell>
                        <TableCell>Наименование</TableCell>
                        <TableCell>Ед. изм.</TableCell>
                        <TableCell>Цена</TableCell>
                        <TableCell>Количество</TableCell>
                        <TableCell>Сумма</TableCell>
                        <TableCell>Стоимость доставки</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(({ id, price, quantity, costDelivery, product }, index) => (
                        <TableRow key={id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.unit.name}</TableCell>
                            <TableCell>{price}</TableCell>
                            <TableCell>{quantity}</TableCell>
                            <TableCell>{price * quantity}</TableCell>
                            <TableCell>{costDelivery}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableBase>
        </TableContainer>
    )
}
