import React from "react"

import Router from "next/router"

import { Box, Button, Typography } from "@mui/material"

import { Select } from "@components"
import { useData } from "@hooks"

export default function Footer({ workerId, setWorkerId, onSend }) {
    const workers = useData(`${process.env.API_URL}workers`)

    return (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 2 }} variant="subtitle1">
                    Оформил:
                </Typography>
                {workers.data && (
                    <Select
                        width={300}
                        value={workerId}
                        options={workers.data.map(item => ({
                            ...item,
                            name: `${item.surname} ${item.name}`,
                        }))}
                        onChange={event => setWorkerId(event.target.value)}
                    />
                )}
            </Box>
            <Box sx={{ display: "flex" }} height={"80%"}>
                <Button onClick={onSend} variant="contained" sx={{ mr: 2 }}>
                    Принять
                </Button>
                <Button variant="contained" color="error" onClick={() => Router.back()}>
                    Отклонить
                </Button>
            </Box>
        </Box>
    )
}
