import React from "react"
import { useRouter } from "next/router"
import dayjs from "dayjs"

import { Container } from "@mui/material"

import { useData } from "@hooks"
import { divisionKind, divisionKindDTO } from "@utils/enums"
import { inverseEnum } from "@utils/helpers"
import { Title, Table } from "../components"

export default function PurchaseInvoice() {
    const router = useRouter()
    const { id } = router.query
    const { data, isLoading } = useData(id ? `${process.env.API_URL}purchase-invoices/${id}` : null)

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
                title={`Приходная накладная номер ${data.number} от ${dayjs(data.date).format(
                    "DD.MM.YYYY HH:mm"
                )}`}
                worker={data.worker.surname + " " + data.worker.name}
                subtitles={[
                    `Поставщик: ${data.partner.name}`,
                    `Подразделение: ${
                        divisionKind[inverseEnum(divisionKindDTO)[data.division.kind]]
                    } № ${data.division.number}`,
                ]}
            />
            <Table invoiceId={id} />
        </Container>
    )
}
