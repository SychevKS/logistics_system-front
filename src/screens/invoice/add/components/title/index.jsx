import React from "react"

import { Box, Typography, Divider, TextField } from "@mui/material"

import { DateInput, SelectDivision, SelectPartner } from "@components"

export default function Title({ name, partner }) {
    return (
        <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ display: "flex", alignItems: "center" }} variant="h5">
                    {name} №
                    <TextField
                        sx={{
                            "mx": 1,
                            "& .MuiInputBase-input": { fontSize: 20, fontWeight: 500 },
                        }}
                        variant="outlined"
                        size="small"
                    />
                    от
                    <Box sx={{ ml: 1 }}>
                        <DateInput width={170} fontSize={20} />
                    </Box>
                </Typography>
            </Box>

            <Divider sx={{ backgroundColor: "black", borderBottomWidth: 2, mt: 1 }} />

            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ mr: 2 }} variant="subtitle1">
                        {partner}:
                    </Typography>
                    <SelectPartner
                        width={250}
                        options={[{ name: `ЧВК "ВАГНЕР"` }, { name: `ООО Троечка` }]}
                        onChange={value => console.log(value)}
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ mr: 2 }} variant="subtitle1">
                        Подразделение:
                    </Typography>
                    <SelectDivision
                        width={250}
                        options={[{ name: `Магазин "НВ"` }, { name: `Торговая точка "Почка"` }]}
                        onChange={value => console.log(value)}
                    />
                </Box>
            </Box>
        </Box>
    )
}
