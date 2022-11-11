import React from "react"
import Link from "next/link"
import { useAuth } from "react-oidc-context"

import { Box, Container, Paper, Typography, Button, Link as ALink } from "@mui/material"

export default function Home() {
    React.useEffect(() => {
        const jwt =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJhZG1pbiIsIm5iZiI6MTY2Nzc2MDMyOSwiZXhwIjoxNjY3NzYwMzg5LCJpc3MiOiJNeUF1dGhTZXJ2ZXIiLCJhdWQiOiJNeUF1dGhDbGllbnQifQ.EFhEmO9AFw-2Fh6ExRLWymbpILefuIppQPwknlLxC8g"

        let jwtData = jwt.split(".")[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)

        console.log(decodedJwtData)
    }, [])

    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                pt: 4,
                pb: 6,
            }}
        >
            <Paper sx={{ mr: 5, p: 2, mb: 2 }}>
                <Box sx={{ width: 300 }}>
                    <Typography fontWeight={500}>Накладные</Typography>
                    <Box display="flex" flexDirection="column" mt={1}>
                        <Link href="/invoices-purchase" passHref>
                            <ALink underline="hover">Приходные</ALink>
                        </Link>
                        <Link href="/invoices-sale" passHref>
                            <ALink underline="hover">Расходные</ALink>
                        </Link>
                        <Link href="/invoices-transfer" passHref>
                            <ALink underline="hover">Акты приемки-передачи</ALink>
                        </Link>
                    </Box>
                </Box>
            </Paper>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Box sx={{ width: 300 }}>
                    <Typography fontWeight={500}>Планы</Typography>
                    <Box display="flex" flexDirection="column" mt={1}>
                        <Link href="/plans" passHref>
                            <ALink underline="hover">Планы</ALink>
                        </Link>
                    </Box>
                </Box>
            </Paper>
            <Paper sx={{ mr: 5, p: 2, mb: 2 }}>
                <Box sx={{ width: 300 }}>
                    <Typography fontWeight={500}>Справочники</Typography>
                    <Box display="flex" flexDirection="column" mt={1}>
                        <Link href="/workers" passHref>
                            <ALink underline="hover">Сотрудники</ALink>
                        </Link>
                        <Link href="/divisions" passHref>
                            <ALink underline="hover">Подразделения</ALink>
                        </Link>
                        <Link href="/partners" passHref>
                            <ALink underline="hover">Партнеры</ALink>
                        </Link>
                        <Link href="/products" passHref>
                            <ALink underline="hover">Товары</ALink>
                        </Link>
                        <Link href="/units" passHref>
                            <ALink underline="hover">Еденицы измерения товара</ALink>
                        </Link>
                    </Box>
                </Box>
            </Paper>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Box sx={{ width: 300 }}>
                    <Typography fontWeight={500}>Подсчет</Typography>
                    <Box display="flex" flexDirection="column" mt={1}>
                        <Link href="/remainings" passHref>
                            <ALink underline="hover">Остатки товара</ALink>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}
