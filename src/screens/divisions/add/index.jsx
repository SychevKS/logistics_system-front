import React, { useState } from "react"
import { v4 } from "uuid"
import { useRouter } from "next/router"

import { Container, Button, Paper, Typography, TextField } from "@mui/material"

import { Select } from "@components"
import { divisionKind, divisionKindDTO } from "@utils/enums"

export default function AddDivision() {
    const router = useRouter()

    const [number, setNumber] = useState(null)
    const [kind, setKind] = useState(0)

    const onSend = () => {
        const data = new URLSearchParams({
            Id: v4(),
            Number: number,
            Kind: kind,
        }).toString()

        fetch(`${process.env.API_URL}divisions?${data}`, {
            method: "post",
        }).then(() => router.push("/divisions"))
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
                    Добавление подразделения:
                </Typography>
                <TextField
                    type="number"
                    value={number}
                    onChange={event => setNumber(event.target.value)}
                    size="small"
                    margin="dense"
                    fullWidth
                    label="Номер"
                />

                <Select
                    label="Тип"
                    value={kind}
                    onChange={event => setKind(event.target.value)}
                    options={Object.entries(divisionKind).map(([key, value]) => ({
                        id: divisionKindDTO[key],
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
