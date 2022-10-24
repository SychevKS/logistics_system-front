import React from "react"

import { TextField } from "@mui/material"
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete"

const filter = createFilterOptions()

export default function DataList({ width, options, onChange, toggleOpen, optionLabelField }) {
    return (
        <Autocomplete
            onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                    // тайм-аут, чтобы избежать мгновенной проверки формы диалогового окна.
                    setTimeout(() => {
                        toggleOpen(true)
                    })
                } else if (newValue && newValue.inputValue) {
                    toggleOpen(true)
                } else {
                    //setValue(newValue)
                    onChange(newValue)
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params)
                if (params.inputValue !== "") {
                    filtered.push({
                        inputValue: params.inputValue,
                        name: `Добавить "${params.inputValue}"`,
                    })
                }
                return filtered
            }}
            options={options}
            getOptionLabel={option => {
                if (typeof option === "string") {
                    return option
                }
                if (option.inputValue) {
                    return option.inputValue
                }
                return option[optionLabelField]
            }}
            renderOption={(props, option) => {
                return <li {...props}>{option[optionLabelField]}</li>
            }}
            renderInput={params => <TextField variant="standard" {...params} />}
            disablePortal
            freeSolo
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            sx={{ width: width }}
        />
    )
}
