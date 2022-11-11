import React from "react"
import Link from "next/link"

import { Container, Button } from "@mui/material"

import { List } from "../components"
import { useData } from "@hooks"

export default function TransferInvoices() {
    const { data } = useData(`${process.env.API_URL}transfer-invoices`)

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
            <Link href="/add-invoice-transfer" passHref>
                <Button sx={{ width: 400, mb: 2 }} variant="contained">
                    Добавить акт приема-передачи
                </Button>
            </Link>
            {data && (
                <List
                    invoices={data}
                    columns={["Подразделение отправитель", "Подразделение приниматель"]}
                    url="invoice-transfer/"
                />
            )}
        </Container>
    )
}
