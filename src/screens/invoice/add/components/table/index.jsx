import React from "react"

import {
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Table,
    TableContainer,
    Paper,
    IconButton,
    Autocomplete,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

import { useRows } from "src/hooks"

const nomenclature = [
    { name: "Свиной хвост", unit: "шт", price: 312 },
    { name: "Грудка свиньи", unit: "шт", price: 228 },
    { name: "Свиньи копыта", unit: "шт", price: 447 },
]

const initialRow = {
    name: undefined,
    unit: null,
    price: null,
    amount: undefined,
    sum: 0,
}

export default function ListProducts() {
    const { rows, removeRow, onChangeSelect, onChangeInput } = useRows(initialRow)

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
            <Table
                sx={{
                    minWidth: 650,
                    th: { borderBottom: "2px solid black", textAlign: "center", fontWeight: 700 },
                    td: { borterBottom: 0, textAlign: "center" },
                }}
                size="small"
                stickyHeader
            >
                <TableHead>
                    <TableRow>
                        <TableCell>№ пп</TableCell>
                        <TableCell sx={{ width: 400 }}>Наименование</TableCell>
                        <TableCell>Ед. изм.</TableCell>
                        <TableCell>Цена, руб</TableCell>
                        <TableCell sx={{ width: 100 }}>Количество</TableCell>
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
                                            sum: row.amount ? row.amount * value.price : 0,
                                        }))(newValue)
                                    }
                                    getOptionLabel={option => option.name}
                                    renderInput={params => (
                                        <TextField variant="standard" {...params} />
                                    )}
                                    renderOption={(props, option) => (
                                        <li {...props}>{option.name}</li>
                                    )}
                                />
                            </TableCell>
                            <TableCell>{row.unit}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    variant="standard"
                                    onBlur={onChangeInput(index, (value, row) => ({
                                        amount: value,
                                        sum: value * row.price,
                                    }))}
                                />
                            </TableCell>
                            <TableCell>{row.sum}</TableCell>
                            <TableCell>
                                <IconButton size="small" onClick={() => removeRow(index)}>
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
