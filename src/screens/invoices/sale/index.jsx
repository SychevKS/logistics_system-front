import React from "react"

import { Container, Button } from "@mui/material"

import { List } from "../components"

export default function SaleInvoices({ invoices }) {
    return (
        <Container
            maxWidth="lg"
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                pt: 4,
                pb: 6,
            }}
        >
            <Button sx={{ width: 400, mb: 2 }} variant="contained">
                Добавить расходную накладную
            </Button>
            <List
                invoices={invoices}
                columns={["Подразделение", "Покупатель"]}
                url="invoice-sale/"
            />
        </Container>
    )
}
