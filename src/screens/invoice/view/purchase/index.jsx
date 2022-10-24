import React from "react"
import { useRouter } from "next/router"

import { Container, Box, Typography } from "@mui/material"

import { useData } from "@hooks"
import { DivisionKind, DivisionKindDTO } from "@utils/enums"
import { inverseEnum } from "@utils/helpers"
import { Title, Table } from "../components"

export default function PurchaseInvoice() {
    const router = useRouter()
    const { id } = router.query
    const { data, isLoading } = useData(id ? `${process.env.API_URL}purchase-invoice/${id}` : null)

    if (isLoading) {
        return
    }
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
            <Title
                title={`Приходная накладная номер ${data.number} от ${data.date}`}
                subtitles={[
                    `Поставщик: ${data.partner.name}`,
                    `Подразделение: ${
                        DivisionKind[inverseEnum(DivisionKindDTO)[data.division.kind]]
                    } № ${data.division.number}`,
                ]}
            />
            <Table invoiceId={id} />
        </Container>
    )
}
