import React, { useState } from "react"

import { Box, TextField } from "@mui/material"

import { DataList, Modal } from "@components"
import { Select } from "@components"

export default function SelectProduct({ width, options, onChange }) {
    const [open, toggleOpen] = useState(false)

    const [name, setName] = useState("")
    const [unit, setUnit] = useState("")
    const [price, setPrice] = useState("")

    const handleSubmit = () => {
        //запрос
        toggleOpen(false)
    }

    return (
        <Box>
            <DataList
                width={width}
                options={options}
                onChange={onChange}
                toggleOpen={toggleOpen}
                optionLabelField="name"
            />
            <Modal
                title="Добавление товара"
                open={open}
                handleClose={() => toggleOpen(false)}
                handleSubmit={handleSubmit}
            >
                <TextField
                    value={name}
                    onChange={event => setName(event.target.value)}
                    fullWidth
                    margin="normal"
                    label="Название"
                    size="small"
                />
                <Select
                    value={unit}
                    onChange={event => setUnit(event.target.value)}
                    options={["Кг", "Литр"]}
                    label="Еденица измерения"
                    margin={1}
                />
                <TextField
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                    fullWidth
                    type="number"
                    margin="normal"
                    label="Цена"
                    size="small"
                />
            </Modal>
        </Box>
    )
}
