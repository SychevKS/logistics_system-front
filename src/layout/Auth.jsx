import React, { useState } from "react"
import { useRouter } from "next/router"

import { Box, Container, Paper, TextField, Typography, Button } from "@mui/material"

export default function Auth() {
    const router = useRouter()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const onSend = () => {
        const data = new URLSearchParams({
            login: login,
            password: password,
        }).toString()

        fetch(`${process.env.API_URL}authorization?${data}`, {
            method: "post",
        })
            .then(res => res.json())
            .then(data => {
                const { token, roles, name } = data

                sessionStorage.setItem("token", token)
                sessionStorage.setItem("name", name)
                sessionStorage.setItem("role", JSON.stringify(roles))
            })
            .then(() => router.push("/"))
    }

    return (
        <Container
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper sx={{ width: 300, p: 3 }}>
                <Box display="flex" flexDirection="column">
                    <Typography>Введите логин и пароль</Typography>
                    <TextField
                        value={login}
                        onChange={event => setLogin(event.target.value)}
                        margin="normal"
                        label="Логин"
                        variant="standard"
                    />
                    <TextField
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        margin="normal"
                        label="Пароль"
                        variant="standard"
                    />
                    <Button variant="contained" onClick={onSend} sx={{ mt: 4 }}>
                        Войти
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}
