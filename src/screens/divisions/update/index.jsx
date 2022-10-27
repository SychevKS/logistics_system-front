import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { Container, Button, Paper, Typography, TextField } from "@mui/material"

import { useData } from "@hooks"
import { Select } from "@components"
import { divisionKind, divisionKindDTO } from "@utils/enums"

export default function UpdateDivision() {
    const router = useRouter()
    const { id } = router.query

    const division = useData(id ? `${process.env.API_URL}division/${id}` : null)

    const [number, setNumber] = useState(0)
    const [kind, setKind] = useState(0)

    useEffect(() => {
        if (division.data) {
            setNumber(division.data.number)
            setKind(division.data.kind)
        }
    }, [division.data])

    const onSend = () => {
        const data = new URLSearchParams({
            Id: division.data.id,
            Number: number,
            Kind: kind,
        }).toString()

        fetch(`${process.env.API_URL}update-division?${data}`, {
            method: "post",
        }).then(() => router.push("/divisions"))
    }

    if (division.isLoading) {
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
                    Обновление подразделения:
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
                Обновить
            </Button>
        </Container>
    )
}
