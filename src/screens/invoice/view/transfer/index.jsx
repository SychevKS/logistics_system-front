import React from "react"
import { useRouter } from "next/router"
import dayjs from "dayjs"

import { Container } from "@mui/material"

import { useData } from "@hooks"
import { divisionKind, divisionKindDTO } from "@utils/enums"
import { inverseEnum } from "@utils/helpers"
import { Title, Table } from "../components"

export default function TransferInvoice() {
    const router = useRouter()
    const { id } = router.query
    const { data, isLoading } = useData(id ? `${process.env.API_URL}transfer-invoices/${id}` : null)

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
                title={`Акт приема-передачи номер ${data.number} от ${dayjs(data.date).format(
                    "DD.MM.YYYY HH:mm"
                )}`}
                worker={data.worker.surname + " " + data.worker.name}
                subtitles={[
                    `Подразделение отправитель: ${
                        divisionKind[inverseEnum(divisionKindDTO)[data.outDivision.kind]]
                    } № ${data.outDivision.number}`,
                    `Подразделение получатель: ${
                        divisionKind[inverseEnum(divisionKindDTO)[data.inDivision.kind]]
                    } № ${data.inDivision.number}`,
                ]}
            />
            <Table invoiceId={id} />
        </Container>
    )
}
