import React, { useState } from "react"
import { v4 } from "uuid"
import { useRouter } from "next/router"

import { Container, Button, Paper, Typography, TextField } from "@mui/material"

import { useData } from "@hooks"
import { Select } from "@components"

export default function AddProduct() {
    const router = useRouter()

    const units = useData(`${process.env.API_URL}units`)

    const [name, setName] = useState("")
    const [unit, setUnit] = useState("")
    const [price, setPrice] = useState(undefined)

    const onSend = () => {
        const data = new URLSearchParams({
            Id: v4(),
            Name: name,
            UnitId: unit,
            Price: price,
        }).toString()

        fetch(`${process.env.API_URL}products?${data}`, {
            method: "post",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        }).then(() => router.push("/products"))
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
                    Добавление товара:
                </Typography>
                <TextField
                    value={name}
                    onChange={event => setName(event.target.value)}
                    size="small"
                    margin="dense"
                    fullWidth
                    label="Название"
                />
                {units.data && (
                    <Select
                        label="Ед. изм."
                        value={unit}
                        onChange={event => setUnit(event.target.value)}
                        options={units.data}
                    />
                )}
                <TextField
                    type="number"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                    size="small"
                    margin="dense"
                    fullWidth
                    label="Цена"
                />
            </Paper>
            <Button onClick={onSend} sx={{ mt: 2 }} variant="contained">
                Добавить
            </Button>
        </Container>
    )
}
