export default function getArrayFromEnum(enumerator, enumeratorDTO) {
    return Object.entries(enumerator).map(([key, value]) => ({
        id: enumeratorDTO[key],
        name: value,
    }))
}
