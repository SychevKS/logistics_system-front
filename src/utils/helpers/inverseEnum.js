import createEnum from "./createEnum"

export default function inverseEnum(dictionary) {
    let inverse = {}

    for (let key in dictionary) {
        inverse[dictionary[key]] = key
    }

    return createEnum(inverse)
}
