import React from "react"
import Link from "next/link"

import { Box, Container, Paper, Typography, Link as ALink } from "@mui/material"

import { checkRoleUser } from "@utils/helpers"

export default function Home() {
    return (
        <Container
            maxWidth="lg"
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                pt: 4,
                pb: 6,
            }}
        >
            <Paper sx={{ mr: 2, p: 2, mb: 2 }}>
                <Box width={300}>
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
            <Paper sx={{ mr: 2, p: 2, mb: 2 }}>
                <Box width={300}>
                    <Typography fontWeight={500}>Планы</Typography>
                    <Box display="flex" flexDirection="column" mt={1}>
                        <Link href="/plans" passHref>
                            <ALink underline="hover">Планы</ALink>
                        </Link>
                    </Box>
                </Box>
            </Paper>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Box width={300}>
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
            <Paper sx={{ mr: 2, p: 2, mb: 2 }}>
                <Box width={300} minHeight={150}>
                    <Typography fontWeight={500}>Подсчет</Typography>
                    <Box display="flex" flexDirection="column" mt={1}>
                        <Link href="/remainings" passHref>
                            <ALink underline="hover">Остатки товара</ALink>
                        </Link>
                        <Link href="/statistics" passHref>
                            <ALink underline="hover">Показатели</ALink>
                        </Link>
                    </Box>
                </Box>
            </Paper>
            {checkRoleUser(["Admin"]) && (
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Box width={300}>
                        <Typography fontWeight={500}>Администрирование</Typography>
                        <Box display="flex" flexDirection="column" mt={1}>
                            <Link href="/logs" passHref>
                                <ALink underline="hover">Аудит</ALink>
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            )}
        </Container>
    )
}
