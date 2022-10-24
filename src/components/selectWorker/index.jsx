import React from "react"

import { Box, TextField } from "@mui/material"

import { DataList, Modal } from "@components"

export default function SelectWorker({ width, options, onChange }) {
    const [open, toggleOpen] = React.useState(false)

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
                title="Добавление сотрудника"
                open={open}
                handleClose={() => toggleOpen(false)}
                //handleSubmit={handleSubmit}
            >
                <TextField fullWidth margin="dense" label="Фамилия" variant="standard" />
                <TextField fullWidth margin="dense" label="Имя" variant="standard" />
            </Modal>
        </Box>
    )
}
