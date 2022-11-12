import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { Container, Button, Paper, Typography, TextField } from "@mui/material"

import { useData } from "@hooks"
import { Select } from "@components"

export default function UpdateProduct() {
    const router = useRouter()
    const { id } = router.query

    const product = useData(id ? `${process.env.API_URL}products/${id}` : null)
    const units = useData(`${process.env.API_URL}units`)

    const [name, setName] = useState("")
    const [unit, setUnit] = useState("")
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (product.data) {
            setName(product.data.name)
            setUnit(product.data.unit.id)
            setPrice(product.data.price)
        }
    }, [product.data])

    const onSend = () => {
        const data = new URLSearchParams({
            Id: `${product.data.id}`,
            Name: `${name}`,
            UnitId: `${unit}`,
            Price: `${price}`,
        }).toString()

        fetch(`${process.env.API_URL}products?${data}`, {
            method: "put",
        }).then(() => router.push("/products"))
    }

    if (product.isLoading) {
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
                    Обновление товара:
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
                Обновить
            </Button>
        </Container>
    )
}
