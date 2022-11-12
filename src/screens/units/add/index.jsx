import React, { useEffect, useState } from "react"
import { v4 } from "uuid"
import { useRouter } from "next/router"

import { Container, Button, Paper, Typography, TextField } from "@mui/material"

export default function AddUnit() {
    const router = useRouter()

    const [name, setName] = useState("")

    const onSend = () => {
        const data = new URLSearchParams({
            Id: v4(),
            Name: name,
        }).toString()

        fetch(`${process.env.API_URL}units?${data}`, {
            method: "post",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        }).then(() => router.push("/units"))
    }

    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                pt: 4,
                pb: 6,
            }}
        >
            <Paper sx={{ p: 2, width: "100%" }}>
                <Typography sx={{ mb: 2 }} fontSize={24}>
                    Добавление еденицы измерения:
                </Typography>
                <TextField
                    value={name}
                    onChange={event => setName(event.target.value)}
                    size="small"
                    margin="dense"
                    fullWidth
                    label="Имя"
                />
            </Paper>
            <Button onClick={onSend} sx={{ mt: 2 }} variant="contained">
                Добавить
            </Button>
        </Container>
    )
}
