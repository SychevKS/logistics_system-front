import { useCallback, useState, useEffect } from "react"

import { v4 } from "uuid"

import { isObjectFilled } from "@utils/helpers"

const useRows = initialRow => {
    const [rows, setRows] = useState([{ ...initialRow, key: v4() }])

    const removeRow = useCallback(index => {
        if (rows.length != 1 && rows.length - 1 != index) {
            setRows(prev => prev.filter((_, i) => index != i))
        }
    })

    const changeRow = useCallback((index, value) =>
        setRows(prev => {
            const array = [...prev]
            array[index] = {
                ...array[index],
                ...value,
            }
            return array
        })
    )

    const onChangeSelect = useCallback((index, func) => value => {
        if (value) {
            changeRow(index, func(value, rows[index]))
        }
    })

    const onChangeInput = useCallback((index, func) => event => {
        changeRow(index, func(event.target.value, rows[index]))
    })

    useEffect(() => {
        if (isObjectFilled(rows[rows.length - 1])) {
            setRows(prev => [...prev, { ...initialRow, key: v4() }])
        }
    }, [rows])

    return {
        rows,
        onChangeSelect,
        onChangeInput,
        removeRow,
    }
}

export default useRows
