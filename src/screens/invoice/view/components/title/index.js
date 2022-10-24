import React from "react"

import { Box, Typography } from "@mui/material"

export default function Title({ title, subtitles }) {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography fontSize={23} fontWeight={500}>
                {title}
            </Typography>
            {subtitles.map((item, index) => (
                <Typography key={index} fontWeight={500} sx={{ mt: 1 }}>
                    {item}
                </Typography>
            ))}
        </Box>
    )
}
