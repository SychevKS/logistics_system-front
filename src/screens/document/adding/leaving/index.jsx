import React from "react"

import { Container } from "@mui/material"

import { Title, Table, Footer } from "../components"

export default function AddingLeaving() {
    return (
        <Container
            maxWidth="lg"
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                py: 4,
                alignItems: "stretch",
            }}
        >
            <Title name="Расходная накладная" partner="Покупатель" />
            <Table />
            <Footer action="Отпустил" />
        </Container>
    )
}
