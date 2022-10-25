import React from "react"

import Link from "next/link"

import {
    Container,
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Button,
} from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import MenuIcon from "@mui/icons-material/Menu"

const pages = [{ label: "Главная", href: "/" }]

export default function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null)

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ShoppingCartIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={event => setAnchorElNav(event.currentTarget)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => setAnchorElNav(null)}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map(({ label, href }) => (
                                <Link href={href} passHref key={label}>
                                    <MenuItem onClick={() => setAnchorElNav(null)}>
                                        <Typography textAlign="center">{label}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map(({ label, href }) => (
                            <Link href={href} passHref key={label}>
                                <Button
                                    onClick={() => setAnchorElNav(null)}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    {label}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Button color="inherit">Войти</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
