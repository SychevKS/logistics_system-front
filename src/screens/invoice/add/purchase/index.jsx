import React, { useState, useRef } from "react"
import { v4 } from "uuid"
import { useRouter } from "next/router"
import dayjs from "dayjs"

import { Container } from "@mui/material"

import { Title, Table, Footer } from "../components"

import { useData } from "@hooks"
import { divisionKind, divisionKindDTO } from "@utils/enums"
import { inverseEnum } from "@utils/helpers"

const invoiceId = v4()

export default function AddPurchaseInvoice() {
    const router = useRouter()
    const ref = useRef(v4())
    const invoiceId = ref.current

    const [number, setNumber] = useState("")
    const [date, setDate] = useState(dayjs())
    const [divisionId, setDivisionId] = useState("")
    const [partnerId, setPartnerId] = useState("")
    const [workerId, setWorkerId] = useState("")
    const [positions, setPositions] = useState("")

    const divisions = useData(`${process.env.API_URL}divisions`)
    const partners = useData(`${process.env.API_URL}partners`)
    const nomenclature = useData(`${process.env.API_URL}products`)

    const selects = [
        {
            value: partnerId,
            setValue: setPartnerId,
            label: "Поставщик:",
            options: partners.data && partners.data.filter(partner => partner.kind == 0),
        },
        {
            value: divisionId,
            setValue: setDivisionId,
            label: "Подразделение:",
            options:
                divisions.data &&
                divisions.data.map(item => ({
                    ...item,
                    name:
                        divisionKind[inverseEnum(divisionKindDTO)[item.kind]] + " № " + item.number,
                })),
        },
    ]

    const onSend = () => {
        const data = new URLSearchParams({
            Id: invoiceId,
            Date: date,
            Number: number,
            WorkerId: workerId,
            InvoiceId: invoiceId,
            DivisionId: divisionId,
            PartnerId: partnerId,
        }).toString()

        fetch(`${process.env.API_URL}purchase-invoices?${data}`, {
            method: "post",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        })
            .then(() => {
                fetch(`${process.env.API_URL}purchases-positions?${positions}`, {
                    method: "post",
                    headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
                })
            })
            .then(() => router.push("/invoices-purchase"))
    }

    if (divisions.isLoading || partners.isLoading) {
        return
    }
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
                number={number}
                setNumber={setNumber}
                date={date}
                setDate={setDate}
                selects={selects}
            />
            {nomenclature.data && (
                <Table
                    nomenclature={nomenclature.data}
                    setPositions={setPositions}
                    invoiceId={invoiceId}
                />
            )}
            <Footer workerId={workerId} setWorkerId={setWorkerId} onSend={onSend} />
        </Container>
    )
}
