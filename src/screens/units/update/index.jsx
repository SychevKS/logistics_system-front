import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { Container, Button, Paper, Typography, TextField } from "@mui/material"

import { useData } from "@hooks"

export default function UpdateUnit() {
    const router = useRouter()
    const { id } = router.query

    const unit = useData(id ? `${process.env.API_URL}units/${id}` : null)

    const [name, setName] = useState("")

    useEffect(() => {
        if (unit.data) {
            setName(unit.data.name)
        }
    }, [unit.data])

    const onSend = () => {
        const data = new URLSearchParams({
            Id: `${unit.data.id}`,
            Name: `${name}`,
        }).toString()

        fetch(`${process.env.API_URL}units?${data}`, {
            method: "put",
        }).then(() => router.push("/units"))
    }

    if (unit.isLoading) {
        return
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
                    Обновление еденицы измерения:
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
                Обновить
            </Button>
        </Container>
    )
}
