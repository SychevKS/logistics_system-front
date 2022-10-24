import React from "react"
import { Box, MenuItem, FormControl, InputLabel, Select as BasicSelect } from "@mui/material"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

export default function Select({
    options,
    fz,
    value,
    onChange,
    label,
    margin = 0.5,
    disabled = false,
}) {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small" sx={{ mt: margin }} disabled={disabled}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <BasicSelect
                    sx={{ fontSize: fz }}
                    label={label}
                    value={value}
                    onChange={onChange}
                    MenuProps={MenuProps}
                >
                    {options.map((item, index) => (
                        <MenuItem key={index} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </BasicSelect>
            </FormControl>
        </Box>
    )
}
