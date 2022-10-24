import React from "react"

import { Container } from "@mui/material"

import { Title, Table, Footer } from "../components"

export default function AddingIncoming() {
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
            <Title
                name="Приходная накладная"
                subname="(Поступление от поставщика)"
                partner="Поставщик"
            />

            <Table />

            <Footer action="Принял" />
        </Container>
    )
}
