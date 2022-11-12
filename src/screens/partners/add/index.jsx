import React, { useState } from "react"
import { v4 } from "uuid"
import { useRouter } from "next/router"

import { Container, Button, Paper, Typography, TextField } from "@mui/material"

import { Select } from "@components"
import { partnerKind, partnerKindDTO } from "@utils/enums"

export default function AddPartner() {
    const router = useRouter()

    const [name, setName] = useState("")
    const [kind, setKind] = useState(0)

    const onSend = () => {
        const data = new URLSearchParams({
            Id: v4(),
            Name: name,
            Kind: kind,
        }).toString()

        fetch(`${process.env.API_URL}partners?${data}`, {
            method: "post",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        }).then(() => router.push("/partners"))
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
                    Добавление партнера:
                </Typography>
                <TextField
                    value={name}
                    onChange={event => setName(event.target.value)}
                    size="small"
                    margin="dense"
                    fullWidth
                    label="Название"
                />

                <Select
                    label="Тип"
                    value={kind}
                    onChange={event => setKind(event.target.value)}
                    options={Object.entries(partnerKind).map(([key, value]) => ({
                        id: partnerKindDTO[key],
                        name: value,
                    }))}
                />
            </Paper>
            <Button onClick={onSend} sx={{ mt: 2 }} variant="contained">
                Добавить
            </Button>
        </Container>
    )
}
