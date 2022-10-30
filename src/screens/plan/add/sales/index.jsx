import React from "react"
import { v4 } from "uuid"
import { useRouter } from "next/router"

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
    Autocomplete,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

import { Select } from "@components"
import { useRows, useData } from "src/hooks"
import { isObjectFilled } from "@utils/helpers"

const initialRow = {
    name: undefined,
    quantity: undefined,
}

export default function AddSalesPlan() {
    const router = useRouter()
    const planId = v4()

    const { rows, removeRow, onChangeSelect, onChangeInput } = useRows(initialRow)
    const [year, setYear] = React.useState("")

    const nomenclature = useData(`${process.env.API_URL}products`)

    const onSend = () => {
        const data = new URLSearchParams({
            Id: planId,
            Year: year,
        }).toString()

        const positions = rows.reduce(
            (prev, current, index) => {
                if (isObjectFilled(current)) {
                    return (
                        prev +
                        `positions[${index}].Id=${current.key}&` +
                        `positions[${index}].ProductId=${current.id}&` +
                        `positions[${index}].SalesPlanId=${planId}&` +
                        `positions[${index}].Quantity=${current.quantity}&`
                    )
                }
                return prev
            },
            [""]
        )

        fetch(`${process.env.API_URL}add-sales-plan?${data}`, {
            method: "post",
        })
            .then(() => {
                fetch(`${process.env.API_URL}add-sales-plan-positions?${positions}`, {
                    method: "post",
                })
            })
            .then(() => router.push("/plans"))
    }

    if (nomenclature.isLoading) {
        return
    }
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
                    options={Array.from({ length: 40 }, (_, i) => ({
                        id: new Date().getFullYear() - 20 + i,
                        name: new Date().getFullYear() - 20 + i,
                    }))}
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
                                    <Autocomplete
                                        options={nomenclature.data}
                                        onChange={(event, newValue) =>
                                            onChangeSelect(index, value => ({
                                                ...value,
                                            }))(newValue)
                                        }
                                        getOptionLabel={option => option.name}
                                        renderInput={params => (
                                            <TextField
                                                size="small"
                                                variant="standard"
                                                {...params}
                                            />
                                        )}
                                        renderOption={(props, option) => {
                                            if (!rows.some(row => row.id == option.id)) {
                                                return <li {...props}>{option.name}</li>
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        variant="standard"
                                        onBlur={onChangeInput(index, value => ({
                                            quantity: value,
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
                <Button onClick={onSend} variant="outlined" size="small" sx={{ mr: 2 }}>
                    Принять
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => router.push("/plans")}
                >
                    Отклонить
                </Button>
            </Box>
        </Container>
    )
}
