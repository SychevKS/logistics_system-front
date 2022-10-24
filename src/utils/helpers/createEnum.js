export default function createEnum(obj) {
    const newObj = {}

    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            newObj[prop] = String(obj[prop])
        }
    }

    return Object.freeze(newObj)
}
