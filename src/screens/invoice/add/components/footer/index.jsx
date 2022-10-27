import React from "react"

import Router from "next/router"

import { Box, Button, Typography } from "@mui/material"

import { SelectWorker } from "@components"

export default function Footer({ action }) {
    return (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 2 }} variant="subtitle1">
                    {action}:
                </Typography>
                <SelectWorker
                    width={250}
                    options={[{ name: "Сычев К.С" }]}
                    onChange={value => console.log(value)}
                />
            </Box>
            <Box sx={{ display: "flex" }}>
                <Button
                    sx={{ mr: 2 }}
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => Router.back()}
                >
                    Отклонить
                </Button>
                <Button variant="outlined" size="small">
                    Принять
                </Button>
            </Box>
        </Box>
    )
}
