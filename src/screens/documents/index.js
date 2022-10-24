import React from "react"

import { useRouter } from "next/router"

import {
    Container,
    Box,
    TableCell,
    TableRow,
    TableBody,
    Table,
    TableContainer,
    Button,
} from "@mui/material"

import { Modal, Select } from "@components"

const documents = [
    { date: "12.01.2022", number: 1337 },
    { date: "12.01.2022", number: 1337 },
    { date: "12.01.2022", number: 1337 },
]

export default function Documents() {
    const router = useRouter()

    const [modal, setModal] = React.useState({ type: 0, isOpen: false })
    const [sales, setSales] = React.useState("")
    const [procurement, setProcurement] = React.useState("")

    const handleOpen = (type, value) => () => {
        setModal({ type: type, isOpen: value })
    }

    React.useEffect(() => {
        setSales("")
        setProcurement("")
    }, [modal])

    const handleSubmit = event => {
        event.preventDefault()
        const href = modal.type == 0 ? "/add-incoming" : "/add-leaving"
        router.push(href)
    }

    return (
        <Container maxWidth="lg" sx={{ height: "100%" }}>
            <Box display="flex" flexDirection="row" alignItems="stretch" height={"100%"} py={6}>
                <Box display="flex" flexDirection="column" width="100%" mr={6}>
                    <TableContainer
                        sx={{
                            border: 1,
                            boxShadow: 0,
                            flexGrow: 1,
                            height: 0,
                        }}
                    >
                        <Table size="small">
                            <TableBody>
                                {documents.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>Приходная №{row.number}</TableCell>
                                        <TableCell>Дата: {row.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button sx={{ mt: 2 }} variant="outlined" onClick={handleOpen(0, true)}>
                        Подтвердить получение товара
                    </Button>
                </Box>
                <Box display="flex" flexDirection="column" width="100%">
                    <TableContainer
                        sx={{
                            border: 1,
                            boxShadow: 0,
                            flexGrow: 1,
                            height: 0,
                        }}
                    >
                        <Table size="small">
                            <TableBody>
                                {documents.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>Расходная №{row.number}</TableCell>
                                        <TableCell>Дата: {row.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button sx={{ mt: 2 }} variant="outlined" onClick={handleOpen(1, true)}>
                        Подтвердить расход товара
                    </Button>
                </Box>
            </Box>
            <Modal
                title="Выберите план"
                open={modal.isOpen}
                handleClose={handleOpen(modal.type == 0 ? 0 : 1, false)}
                handleSubmit={handleSubmit}
                disabled={modal.type == 0 ? sales == "" || procurement == "" : sales == ""}
            >
                <Select
                    value={sales}
                    onChange={event => setSales(event.target.value)}
                    options={["2022", "2023"]}
                    label="План продаж"
                    margin={1}
                />
                {modal.type == 0 && (
                    <Select
                        value={procurement}
                        onChange={event => setProcurement(event.target.value)}
                        options={["январь", "февраль"]}
                        label="План закупок"
                        margin={2}
                        disabled={sales == ""}
                    />
                )}
            </Modal>
        </Container>
    )
}
