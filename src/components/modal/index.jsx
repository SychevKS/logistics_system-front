import React from "react"

import { Dialog, DialogTitle, DialogActions, DialogContent, Button } from "@mui/material"

export default function Modal({
    title,
    open,
    handleClose,
    handleSubmit,
    children,
    disabled = false,
}) {
    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>{children}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Назад</Button>
                    <Button type="submit" disabled={disabled}>
                        Добавить
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
