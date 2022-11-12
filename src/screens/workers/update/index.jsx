import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { Container, Button, Paper, Typography, TextField } from "@mui/material"

import { useData } from "@hooks"
import { DateInput } from "@components"

export default function UpdateWorker() {
    const router = useRouter()
    const { id } = router.query

    const worker = useData(id ? `${process.env.API_URL}workers/${id}` : null)

    const [surname, setSurname] = useState("")
    const [name, setName] = useState("")
    const [birthDate, setBirthDate] = useState(0)

    useEffect(() => {
        if (worker.data) {
            setSurname(worker.data.surname)
            setName(worker.data.name)
            setBirthDate(worker.data.birthDate)
        }
    }, [worker.data])

    const onSend = () => {
        const data = new URLSearchParams({
            Id: `${worker.data.id}`,
            Surname: `${surname}`,
            Name: `${name}`,
            BirthDate: `${birthDate}`,
        }).toString()

        fetch(`${process.env.API_URL}workers?${data}`, {
            method: "put",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        }).then(() => router.push("/workers"))
    }

    if (worker.isLoading) {
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
                    Обновление сотрудника:
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
                Обновить
            </Button>
        </Container>
    )
}
