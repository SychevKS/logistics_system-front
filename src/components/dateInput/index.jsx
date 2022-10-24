import * as React from "react"

import dayjs from "dayjs"
import "dayjs/locale/ru"

import { TextField } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

export default function DateInput({ width, fontSize }) {
    const [value, setValue] = React.useState(dayjs())

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
            <DatePicker
                value={value}
                onChange={newValue => {
                    setValue(newValue)
                }}
                renderInput={params => (
                    <TextField
                        sx={{
                            "width": width,
                            "& .MuiInputBase-input": { fontSize: fontSize },
                        }}
                        size="small"
                        {...params}
                    />
                )}
            />
        </LocalizationProvider>
    )
}
