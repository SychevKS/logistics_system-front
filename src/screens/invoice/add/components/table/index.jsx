import React, { useEffect } from "react"

import {
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Table as TableBase,
    TableContainer,
    Paper,
    IconButton,
    Autocomplete,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

import { useRows } from "src/hooks"
import { isObjectFilled } from "@utils/helpers"
import { ContactSupport } from "@mui/icons-material"

const initialRow = {
    name: undefined,
    unit: { name: "" },
    price: null,
    quantity: undefined,
    costDelivery: null,
}

export default function Table({ nomenclature, setPositions, invoiceId }) {
    const { rows, removeRow, onChangeSelect, onChangeInput } = useRows(initialRow)

    useEffect(() => {
        const positions = rows.reduce(
            (prev, current, index) => {
                if (isObjectFilled(current)) {
                    return (
                        prev +
                        `positions[${index}].Id=${current.key}&` +
                        `positions[${index}].ProductId=${current.id}&` +
                        `positions[${index}].InvoiceId=${invoiceId}&` +
                        `positions[${index}].Price=${current.price}&` +
                        `positions[${index}].Quantity=${current.quantity}&` +
                        `positions[${index}].CostDelivery=${current.costDelivery}&`
                    )
                }
                return prev
            },
            [""]
        )
        setPositions(positions)
    }, [rows])
    console.log(rows)
    return (
        <TableContainer
            component={Paper}
            sx={{
                boxShadow: 0,
                borderRadius: 0,
                border: "2px solid black",
                flexGrow: 1,
                height: 0,
            }}
        >
            <TableBase size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>№ пп</TableCell>
                        <TableCell width={300}>Наименование</TableCell>
                        <TableCell>Ед. изм.</TableCell>
                        <TableCell>Цена, руб</TableCell>
                        <TableCell width={100}>Количество</TableCell>
                        <TableCell width={150}>Доставка, руб</TableCell>
                        <TableCell>Сумма, руб</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row.key}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <Autocomplete
                                    options={nomenclature}
                                    onChange={(event, newValue) =>
                                        onChangeSelect(index, value => ({
                                            ...value,
                                        }))(newValue)
                                    }
                                    getOptionLabel={option => option.name}
                                    renderInput={params => (
                                        <TextField size="small" variant="standard" {...params} />
                                    )}
                                    renderOption={(props, option) => {
                                        if (!rows.some(row => row.id == option.id)) {
                                            return <li {...props}>{option.name}</li>
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell>{row.unit.name}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>
                                <TextField
                                    value={row.quantity}
                                    type="number"
                                    variant="standard"
                                    onChange={onChangeInput(index, (value, row) => ({
                                        quantity: value > row.remains ? row.remains : value,
                                        sum: value * row.price,
                                    }))}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    variant="standard"
                                    onBlur={onChangeInput(index, (value, row) => ({
                                        costDelivery: value,
                                    }))}
                                />
                            </TableCell>
                            <TableCell>
                                {row.quantity &&
                                    row.price &&
                                    row.costDelivery &&
                                    Number(row.quantity) * Number(row.price) +
                                        Number(row.costDelivery)}
                            </TableCell>
                            <TableCell>
                                <IconButton size="small" onClick={() => removeRow(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableBase>
        </TableContainer>
    )
}
