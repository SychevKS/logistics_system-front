import React from "react"
import { useRouter } from "next/router"

import { Container } from "@mui/material"

import { useData } from "@hooks"
import { DivisionKind, DivisionKindDTO } from "@utils/enums"
import { inverseEnum } from "@utils/helpers"
import { Title, Table } from "../components"

export default function TransferInvoice() {
    const router = useRouter()
    const { id } = router.query
    const { data, isLoading } = useData(id ? `${process.env.API_URL}transfer-invoice/${id}` : null)

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
                title={`Акт приема-передачи номер ${data.number} от ${data.date}`}
                subtitles={[
                    `Подразделение отправитель: ${
                        DivisionKind[inverseEnum(DivisionKindDTO)[data.inDivision.kind]]
                    } № ${data.inDivision.number}`,
                    `Подразделение получатель: ${
                        DivisionKind[inverseEnum(DivisionKindDTO)[data.outDivision.kind]]
                    } № ${data.outDivision.number}`,
                ]}
            />
            <Table invoiceId={id} />
        </Container>
    )
}
