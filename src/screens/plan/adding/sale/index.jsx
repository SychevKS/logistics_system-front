import React from "react"

import dayjs from "dayjs"

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

import { Select, SelectProduct } from "@components"
import { useRows } from "src/hooks"

const nomenclature = [
    { name: "Свиной хвост" },
    { name: "Грудка свиньи" },
    { name: "Свиньи копыта" },
]

const initialRow = {
    name: undefined,
    amount: undefined,
}

export default function AddingSalesPlan() {
    const { rows, removeRow, onChangeSelect, onChangeInput } = useRows(initialRow)
    const [year, setYear] = React.useState("")

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
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Typography variant="h5" sx={{ mr: 1 }}>
                    Составление плана продаж на
                </Typography>
                <Select
                    value={year}
                    onChange={event => setYear(event.target.value)}
                    fz={20}
                    options={Array.from(
                        { length: 40 },
                        (_, i) => new Date().getFullYear() - 20 + i
                    )}
                />
                <Typography variant="h5" sx={{ ml: 1 }}>
                    г.
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
                            <TableCell align="left" width={200}>
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
