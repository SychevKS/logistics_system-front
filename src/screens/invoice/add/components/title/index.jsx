import React from "react"
import dayjs from "dayjs"

import { Box, Typography, TextField } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"

import { Select } from "@components"

export default function Title({ name, number, setNumber, date, setDate, selects }) {
    return (
        <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography fontSize={23} fontWeight={500}>
                    {name} №
                </Typography>
                <TextField
                    value={number}
                    onChange={event => setNumber(event.target.value)}
                    sx={{
                        "width": 170,
                        "mx": 1,
                        "& .MuiInputBase-input": { fontSize: 20 },
                    }}
                    variant="outlined"
                    size="small"
                />
                <Typography fontSize={23} fontWeight={500}>
                    от
                </Typography>
                <Box ml={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
                        <DateTimePicker
                            renderInput={props => (
                                <TextField
                                    size="small"
                                    sx={{
                                        "width": 270,
                                        "& .MuiInputBase-input": { fontSize: 20 },
                                    }}
                                    {...props}
                                />
                            )}
                            value={date}
                            onChange={newValue => {
                                setDate(newValue)
                            }}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>

            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                {selects.map((select, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ mr: 2 }} variant="subtitle1">
                            {select.label}
                        </Typography>
                        <Select
                            width={300}
                            value={select.value}
                            options={select.options}
                            onChange={event => select.setValue(event.target.value)}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
