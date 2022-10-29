export default function isObjectFilled(object) {
    let filled = true
    Object.values(object).forEach(item => {
        if (!item) filled = false
    })
    return filled
}
