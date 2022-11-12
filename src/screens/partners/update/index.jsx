import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { Container, Button, Paper, Typography, TextField } from "@mui/material"

import { useData } from "@hooks"
import { Select } from "@components"
import { partnerKind, partnerKindDTO } from "@utils/enums"

export default function UpdatePartner() {
    const router = useRouter()
    const { id } = router.query

    const partner = useData(id ? `${process.env.API_URL}partners/${id}` : null)

    const [name, setName] = useState("")
    const [kind, setKind] = useState(0)

    useEffect(() => {
        if (partner.data) {
            setName(partner.data.name)
            setKind(partner.data.kind)
        }
    }, [partner.data])

    const onSend = () => {
        const data = new URLSearchParams({
            Id: partner.data.id,
            Name: name,
            Kind: kind,
        }).toString()

        fetch(`${process.env.API_URL}partners?${data}`, {
            method: "put",
        }).then(() => router.push("/partners"))
    }

    if (partner.isLoading) {
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
                    Обновление партнера:
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
                Обновить
            </Button>
        </Container>
    )
}
