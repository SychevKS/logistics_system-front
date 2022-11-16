import React from "react"
import Router from "next/router"
import Link from "next/link"

import { Container, Box, AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import LogoutIcon from "@mui/icons-material/Logout"

const pages = [{ label: "Главная", href: "/" }]

export default function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null)

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ShoppingCartIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Link href="/" passHref>
                            <Button
                                sx={{
                                    my: 2,
                                    color: "white",
                                    display: "block",
                                    textTransform: "none",
                                }}
                            >
                                Главная
                            </Button>
                        </Link>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography fontWeight={500}>
                            Пользователь: {sessionStorage.getItem("name")}
                        </Typography>
                        <IconButton
                            color="inherit"
                            onClick={() => {
                                sessionStorage.removeItem("token")
                                Router.reload()
                            }}
                            sx={{ ml: 2, textTransform: "none" }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
