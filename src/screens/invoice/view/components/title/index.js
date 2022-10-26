import React from "react"

import { Box, Typography, Paper } from "@mui/material"

export default function Title({ title, worker, subtitles }) {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography fontSize={23} fontWeight={500}>
                {title}
            </Typography>
            <Paper sx={{ p: 2, mt: 2 }}>
                <Typography fontWeight={500}>Сотрудник: {worker}</Typography>
                {subtitles.map((item, index) => (
                    <Typography key={index} fontWeight={500} sx={{ mt: 1 }}>
                        {item}
                    </Typography>
                ))}
            </Paper>
        </Box>
    )
}
