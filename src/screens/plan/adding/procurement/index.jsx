import React, { useState } from "react"

import {
    Container,
    Typography,
    TextField,
    Box,
    TableContainer,
    Table,
    Paper,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    IconButton,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

import { SelectProduct, SelectDivision, Select } from "@components"
import { useRows } from "src/hooks"

const nomenclature = [
    { name: "Свиной хвост" },
    { name: "Грудка свиньи" },
    { name: "Свиньи копыта" },
]

const divisions = [{ name: "Пятерочка" }, { name: "Лавка Удавка" }]

const initialRow = {
    name: undefined,
    amount: undefined,
    division: undefined,
}

export default function AddingProcurementPlan() {
    const { rows, removeRow, onChangeSelect, onChangeInput } = useRows(initialRow)
    const [month, setMonth] = useState("")

    console.log(rows)

    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                py: 4,
                alignItems: "stretch",
            }}
        >
            <Box display="flex" alignItems="center" mb={3}>
                <Typography variant="h5" sx={{ mr: 1 }}>
                    Составление плана закупок на
                </Typography>
                <Select
                    value={month}
                    onChange={event => setMonth(event.target.value)}
                    fz={20}
                    options={[
                        "январь",
                        "февраль",
                        "март",
                        "апрель",
                        "май",
                        "июнь",
                        "июль",
                        "август",
                        "сентябрь",
                        "октябрь",
                        "ноябрь",
                        "декабрь",
                    ]}
                />
                <Typography variant="h5" sx={{ ml: 1 }}>
                    месяц.
                </Typography>
            </Box>

            <TableContainer
                component={Paper}
                sx={{
                    border: 1,
                    boxShadow: 0,
                    flexGrow: 1,
                    height: 0,
                }}
            >
                <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Наименование</TableCell>
                            <TableCell align="left">Подразделение</TableCell>
                            <TableCell align="left" width={150}>
                                Количество
                            </TableCell>
                            <TableCell width={64}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.key}>
                                <TableCell>
                                    <SelectProduct
                                        options={nomenclature}
                                        onChange={onChangeSelect(index, value => ({
                                            ...value,
                                        }))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <SelectDivision
                                        options={divisions}
                                        onChange={onChangeSelect(index, value => ({
                                            division: value.name,
                                        }))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        variant="standard"
                                        onBlur={onChangeInput(index, value => ({
                                            amount: value,
                                        }))}
                                    />
                                </TableCell>
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
            <Box sx={{ display: "flex", mt: 3, mr: 0, ml: "auto" }}>
                <Button sx={{ mr: 2 }} variant="outlined" color="error" size="small">
                    Отклонить
                </Button>
                <Button variant="outlined" size="small">
                    Принять
                </Button>
            </Box>
        </Container>
    )
}
