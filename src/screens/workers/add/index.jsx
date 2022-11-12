import React, { useState } from "react"
import { useRouter } from "next/router"
import { v4 } from "uuid"

import { Container, Button, Paper, Typography, TextField } from "@mui/material"

import { DateInput } from "@components"

export default function AddWorker() {
    const router = useRouter()

    const [surname, setSurname] = useState("")
    const [name, setName] = useState("")
    const [birthDate, setBirthDate] = useState(null)

    const onSend = () => {
        const data = new URLSearchParams({
            Id: v4(),
            Surname: surname,
            Name: name,
            BirthDate: birthDate,
        }).toString()

        fetch(`${process.env.API_URL}workers?${data}`, {
            method: "post",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        }).then(() => router.push("/workers"))
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
                    Добавление сотрудника:
                </Typography>
                <TextField
                    value={surname}
                    onChange={event => setSurname(event.target.value)}
                    size="small"
                    margin="dense"
                    fullWidth
                    label="Фамилия"
                />
                <TextField
                    value={name}
                    onChange={event => setName(event.target.value)}
                    size="small"
                    margin="dense"
                    fullWidth
                    label="Имя"
                />
                <DateInput
                    value={birthDate}
                    setValue={setBirthDate}
                    width={"100%"}
                    margin="dense"
                    label={"Дата рождения"}
                />
            </Paper>
            <Button onClick={onSend} sx={{ mt: 2 }} variant="contained">
                Добавить
            </Button>
        </Container>
    )
}
