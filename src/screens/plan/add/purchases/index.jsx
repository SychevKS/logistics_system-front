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
import { month, monthDTO } from "@utils/enums"
import { isObjectFilled, getArrayFromEnum, getNameDivision } from "@utils/helpers"

const initialRow = {
    name: undefined,
    quantity: undefined,
}

export default function AddPurchasesPlan() {
    const router = useRouter()
    const planId = v4()
    const { id } = router.query

    const { rows, removeRow, onChangeSelect, onChangeInput } = useRows(initialRow)
    const [monthValue, setMonthValue] = React.useState(0)

    const nomenclature = useData(`${process.env.API_URL}products`)
    const divisions = useData(`${process.env.API_URL}divisions`)

    const onSend = () => {
        const data = new URLSearchParams({
            Id: planId,
            Month: monthValue,
            PlanSalesId: id,
        }).toString()

        const positions = rows.reduce(
            (prev, current, index) => {
                if (isObjectFilled(current)) {
                    return (
                        prev +
                        `positions[${index}].Id=${current.key}&` +
                        `positions[${index}].ProductId=${current.id}&` +
                        `positions[${index}].PlanPurchasesId=${planId}&` +
                        `positions[${index}].Quantity=${current.quantity}&` +
                        `positions[${index}].DivisionId=${current.division?.id}&`
                    )
                }
                return prev
            },
            [""]
        )
        fetch(`${process.env.API_URL}purchases-plans?${data}`, {
            method: "post",
        })
            .then(() => {
                fetch(`${process.env.API_URL}purchases-plan-positions?${positions}`, {
                    method: "post",
                })
            })
            .then(() => router.push("/plans"))
    }

    if (nomenclature.isLoading || divisions.isLoading) {
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
                    Составление плана закупок на
                </Typography>
                <Select
                    value={monthValue}
                    onChange={event => setMonthValue(event.target.value)}
                    fz={20}
                    options={getArrayFromEnum(month, monthDTO)}
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
                            <TableCell align="left">Подразделение</TableCell>
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
                                        options={divisions.data}
                                        onChange={(event, newValue) =>
                                            onChangeSelect(index, value => ({
                                                division: value,
                                            }))(newValue)
                                        }
                                        getOptionLabel={option => getNameDivision(option)}
                                        renderInput={params => (
                                            <TextField
                                                size="small"
                                                variant="standard"
                                                {...params}
                                            />
                                        )}
                                        renderOption={(props, option) => {
                                            if (!rows.some(row => row.division?.id == option.id)) {
                                                return <li {...props}>{getNameDivision(option)}</li>
                                            }
                                        }}
                                    />
                                </TableCell>
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
